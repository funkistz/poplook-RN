import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import AuthService from '../../Services/AuthService'
import GeneralService from '../../Services/GeneralService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { assignCartId } from './Cart';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

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
    device_type: 'Android',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
}

export const loginUser: any = createAsyncThunk(
    "users/login",
    async ({ email, password }: any, { getState, rejectWithValue, dispatch }) => {
        try {
            const state: any = getState();
            console.log('statelogin', state)
            const id_cart = state.cart.id_cart;
            const id_shop = state.session.country.id_shop

            const response = await AuthService.login({ email, password, id_cart, id_shop });
            let data = await response.json()
            console.log("response", data)

            if (response.status === 200) {

                if (data.code == 200) {

                    // const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

                    dispatch(assignCartId(data.data.id_cart));

                    return data
                } else {
                    return rejectWithValue(data)
                }

            } else {
                return rejectWithValue(data)
            }
        } catch (e: any) {
            console.log("Error", e.response.data)
            rejectWithValue(e.response.data)
        }
    }
)

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        changeCountry: (state, action) => {

            console.log('changeCountry', action.payload);
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
                    console.log('getData', value);

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
            state = {...state,  
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

            console.log('logout');
            const temp: any = {};
            temp.user = null;

            GeneralService.toast({ description: 'Logout successfully' });

            state = { ...state, ...temp }
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            // reduce the collection by the id property into a shape of { 1: { ...user }}
            console.log('action fulfilled', payload);

            const temp: any = {};
            temp.user = payload.data;
            temp.isFetching = false;
            temp.isSuccess = true;

            state = { ...state, ...temp }

            GeneralService.toast({ description: payload.message });

            return state;
        }).addCase(loginUser.pending, (state, { payload }) => {
            // reduce the collection by the id property into a shape of { 1: { ...user }}

            state.isFetching = true;
            state.isError = false;
            state.isSuccess = false;
            state.errorMessage = null;
        }).addCase(loginUser.rejected, (state, { payload }) => {
            // reduce the collection by the id property into a shape of { 1: { ...user }}
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;

            GeneralService.toast({ description: payload.message });
        })
    },
})

// Action creators are generated for each case reducer function
export const { changeCountry, logout, profile } = sessionSlice.actions

export const userSelector = (state: any) => state.session

export default sessionSlice.reducer