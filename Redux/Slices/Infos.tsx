import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import AuthService from '../../Services/AuthService'
import CartService from '../../Services/CartService'
import GeneralService from '../../Services/GeneralService'
import InfoService from '../../Services/InfoService'

export interface InfoState {
    countries: [],
}

const initialState: InfoState = {
    countries: [],
}

export const getCountries: any = createAsyncThunk(
    "infos/getCountries",
    async (_: void, { getState, rejectWithValue }) => {
        try {
            const response = await InfoService.getCountries();
            let data = await response.json()
            console.log("data", data)

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
            console.log("Error", e.response.data)
            rejectWithValue(e.response.data)
        }
    }
)

export const infosSlice = createSlice({
    name: 'infos',
    initialState,
    reducers: {
        clearCountries: (state) => {

            console.log('clear countries');
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

            console.log('stategetcountries', state);
            return state;
        }).addCase(getCountries.pending, (state, { payload }) => {

        }).addCase(getCountries.rejected, (state, { payload }) => {
            console.log('payload', payload);
            // GeneralService.toast({ description: payload.message });
        })
    },
})

// Action creators are generated for each case reducer function
export const { clearCountries } = infosSlice.actions

export const countrySelector = (state: any) => state.infos.countries

export default infosSlice.reducer