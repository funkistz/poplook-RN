import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthService from '../../Services/AuthService'
import GeneralService from '../../Services/GeneralService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { assignCartId } from './Cart';
import { assignWishlistId } from './Wishlist';

export interface SessionState {
    user: {} | null,
    loginLoading: boolean,
    loginFinish: boolean,
    loginErrorMessage: string,
    country: {},
    currencySign: string,
    id_lang: string,
    device_type: string,
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage: string | null,
    intro: boolean,
    token: string
}

const dummy = {
    id_country: "136",
    country_name: "Malaysia",
    country_iso_code: "MY",
    id_shop: "1",
    shop_url: "http://poplook.com/",
    currency_name: "Malaysian Ringgit",
    currency_iso_code: "MYR",
    currency_sign: "RM",
    country_flag: "https://poplook.com/img/flag/my.png",
}

const initialState: SessionState = {
    user: null,
    loginLoading: false,
    loginFinish: false,
    loginErrorMessage: '',
    country: dummy,
    currencySign: 'RM',
    id_lang: '1',
    device_type: 'android',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    intro: false,
    token: ''
}

export const loginUser: any = createAsyncThunk(
    "users/login",
    async ({ email, password }: any, { getState, rejectWithValue, dispatch }) => {
        try {

            const state: any = getState();
            const id_cart = state.cart.id_cart;
            const id_shop = state.session.country.id_shop

            const response = await AuthService.login({ email, password, id_cart, id_shop });
            let data = await response.data

            if (response.status == 200) {

                if (data.code == 200) {

                    dispatch(assignCartId(data.data.id_cart));
                    dispatch(assignWishlistId(data.data.id_wishlist));
                    dispatch(assignToken(data.data.token))

                    return data
                } else {
                    return rejectWithValue(data)
                }

            } else {
                return rejectWithValue(data)
            }
        } catch (e: any) {
            rejectWithValue(e.response.data)
        }
    }
)

export const customerDetails: any = createAsyncThunk(
    "users/customerDetails",
    async (_: void, { getState, rejectWithValue, dispatch }) => {
        try {
            const state: any = getState();
            const email = state.session.user.email

            const response = await AuthService.customerDetails(email);
            let data = await response.json()

            if (response.status === 200) {

                if (data.code == 200) {

                    dispatch(assignCartId(data.data.id_cart));

                    return data
                } else {
                    return rejectWithValue(data)
                }

            } else {
                return rejectWithValue(data)
            }
        } catch (e: any) {
            
            rejectWithValue(e.response.data)
        }
    }
)

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        changeCountry: (state, action) => {

            
            const temp: any = {};
            temp.country = action.payload;

            const storeData = async (value: any) => {
                try {

                    await AsyncStorage.setItem('id_shop', temp.country.id_shop);

                } catch (e) {
                    // saving error
                }
            }

            const getData = async () => {
                try {
                    const value = await AsyncStorage.getItem('id_shop')
                    

                    if (value !== null) {
                        // value previously stored
                    }
                } catch (e) {
                    // error reading value
                }
            }

            state = { ...state, ...temp }
            return state;
        },
        profile: (state, action) => {
            state = {
                ...state,
                user: {
                    ...state.user,
                    newsletter: action.payload.newsletter,
                    name: action.payload.firstname,
                    lastname: action.payload.lastname,
                    email: action.payload.email
                }
            }
            return state;
        },
        logout: (state) => {

            
            const temp: any = {};
            temp.user = null;
            temp.isSuccess = null;
            temp.isError = null;

            GeneralService.toast({ description: 'Logout successfully' });

            state = { ...state, ...temp }
            return state;
        },
        intro: (state, action) => {
            
            const temp: any = {};
            temp.intro = action.payload;
            state = { ...state, ...temp }
            return state;
        },
        assignDeviceType: (state, action) => {
            
            const temp: any = {};
            temp.device_type = action.payload;
            state = { ...state, ...temp }
            return state;
        },
        assignToken: (state, action) => {

            
            const temp: any = {};
            temp.token = action.payload;

            state = { ...state, ...temp }

            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {

            const temp: any = {};

            temp.user = payload.data;
            temp.isFetching = false;
            temp.isSuccess = true;
            temp.loginLoading = false;
            temp.loginFinish = true;

            state = { ...state, ...temp }

            GeneralService.toast({ description: payload.message });

            return state;
        }).addCase(loginUser.pending, (state, { payload }) => {
            const temp: any = {};

            temp.isFetching = true;
            temp.isError = false;
            temp.isSuccess = false;
            temp.errorMessage = null;
            temp.loginLoading = true;
            temp.loginFinish = false;

            state = { ...state, ...temp }

            return state;
        }).addCase(loginUser.rejected, (state, { payload }) => {
            const temp: any = {};

            temp.isFetching = false
            temp.isError = true;
            temp.loginLoading = false;
            temp.loginFinish = true;
            temp.errorMessage = payload.message;

            state = { ...state, ...temp }

            GeneralService.toast({ description: payload.message });

            return state;

        })
    },
})

export const { changeCountry, logout, profile, intro, assignDeviceType, assignToken } = sessionSlice.actions

export const userSelector = (state: any) => state.session

export default sessionSlice.reducer