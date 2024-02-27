import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import AuthService from '../../Services/AuthService'
import CartService from '../../Services/CartService'
import GeneralService from '../../Services/GeneralService'
import InfoService from '../../Services/InfoService'

export interface InfoState {
    countries: [],
    addressCountries: [],
    states: [],
}

const initialState: InfoState = {
    countries: [],
    addressCountries: [],
    states: [],
}

export const getCountries: any = createAsyncThunk(
    "infos/getCountries",
    async (_: void, { getState, rejectWithValue }) => {
        try {
            const response = await InfoService.getCountries();
            let data = await response.json()
            if (response.status == 200) {
                if (data.code == 200) {

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

export const getAddressCountries: any = createAsyncThunk(
    "infos/addressCountries",
    async (id_shop: any, { getState, rejectWithValue, dispatch }) => {
        try {

            const response = await InfoService.countryList(id_shop);
            let data = await response.json();

            if (response.status == 200) {
                if (data.code == 200) {
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

export const getStates: any = createAsyncThunk(
    "infos/getStates",
    async ({ code, id_shop }: any, { getState, rejectWithValue, dispatch }) => {
        try {

            const response = await InfoService.stateList(code, id_shop);
            let data = await response.json();

            if (response.status == 200) {
                if (data.code == 200) {
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

export const infosSlice = createSlice({
    name: 'infos',
    initialState,
    reducers: {
        clearCountries: (state) => {

            
            const temp: any = {};
            temp.countries = null;

            state = { ...state, ...temp }
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCountries.fulfilled, (state, { payload }) => {

            const temp: any = {};
            if (payload.data) {
                temp.countries = payload.data;
                state = { ...state, ...temp }
            }

            // 
            return state;
        }).addCase(getCountries.pending, (state, { payload }) => {

        }).addCase(getCountries.rejected, (state, { payload }) => {
            // 
            // GeneralService.toast({ description: payload.message });
        }).addCase(getAddressCountries.fulfilled, (state, { payload }) => {

            const temp: any = {};
            if (payload.data) {
                temp.addressCountries = payload.data;
                state = { ...state, ...temp }
            }

            return state;
        }).addCase(getAddressCountries.pending, (state, { payload }) => {

        }).addCase(getAddressCountries.rejected, (state, { payload }) => {
            // 
            GeneralService.toast({ description: payload.message });
        }).addCase(getStates.fulfilled, (state, { payload }) => {

            const temp: any = {};
            if (payload.data) {
                temp.states = payload.data.states;
                state = { ...state, ...temp }
            }

            return state;
        }).addCase(getStates.pending, (state, { payload }) => {

        }).addCase(getStates.rejected, (state, { payload }) => {
            // 
            GeneralService.toast({ description: payload.message });
        })
    },
})

// Action creators are generated for each case reducer function
export const { clearCountries } = infosSlice.actions

export const countrySelector = (state: any) => state.infos.countries

export default infosSlice.reducer