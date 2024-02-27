import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AddressService from '../../Services/AddressService'

export interface AddressSelectedState {
    id_address: any | null,
    data: {} | null;
}

const initialState: AddressSelectedState = {
    id_address: String,
    data: {}
}


export const getAddressOne: any = createAsyncThunk(
    "addressOne/get",
    async (id_address: any, { getState, rejectWithValue, dispatch }) => {
        try {

            const state: any = getState();

            const response = await AddressService.getAddressOne(id_address);
            let data = await response.data

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

export const addressSelectedSlice = createSlice({
    name: 'address_selected',
    initialState,
    reducers: {
        clearAddress: (state) => {

            
            const temp: any = {};
            temp.id_address = null;
            temp.data = null;

            state = { ...state, ...temp }
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAddressOne.fulfilled, (state, { payload }) => {

            const temp: any = {};
            
            if (payload.data) {
                temp.id_cart = payload.data.id_cart;
                temp.data = payload.data;
                state = { ...state, ...temp }
            }

            
            return state;
        }).addCase(getAddressOne.pending, (state, { payload }) => {


        }).addCase(getAddressOne.rejected, (state, { payload }) => {
            
            // GeneralService.toast({ description: payload.message });
        })
    },
})

// Action creators are generated for each case reducer function
export const { clearAddress } = addressSelectedSlice.actions

export const addressSelectedSelector = (state: any) => state.address_selected

export default addressSelectedSlice.reducer

