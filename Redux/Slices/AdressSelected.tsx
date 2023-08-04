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

// export const clearAddress: any = createAsyncThunk(
//     "addressOne/clear",
//     async (_void: any,  { getState, rejectWithValue }) => {
//         try {
//             const state: any = getState();
//             state.address_selected = null;

//             return state;

//         } catch (e: any) {
//             console.log("Error", e.response.data)
//             rejectWithValue(e.response.data)
//         }
//     }
// )


export const addressSelectedSlice = createSlice({
    name: 'address_selected',
    initialState,
    reducers: {
        clearAddress: (state) => {

            console.log('clear address');
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
            console.log('payloaddnyagulfiladdressone', payload)
            if (payload.data) {
                temp.id_cart = payload.data.id_cart;
                temp.data = payload.data;
                state = { ...state, ...temp }
            }

            console.log('getaddressonestate', state);
            return state;
        }).addCase(getAddressOne.pending, (state, { payload }) => {


        }).addCase(getAddressOne.rejected, (state, { payload }) => {
            console.log('payload', payload);
            // GeneralService.toast({ description: payload.message });
        })
    },
})

// Action creators are generated for each case reducer function
export const { clearAddress } = addressSelectedSlice.actions

export const addressSelectedSelector = (state: any) => state.address_selected

export default addressSelectedSlice.reducer

