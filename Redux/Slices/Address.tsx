import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import AuthService from '../../Services/AuthService'
import AddressService from '../../Services/AddressService'
import GeneralService from '../../Services/GeneralService'

export interface AddressState {
    id_customer: any | null,
    data: {} | null;
    isLoading: boolean;
    isFinish: boolean;

}

const initialState: AddressState = {
    id_customer: null,
    data: {},
    isLoading: false,
    isFinish: false,
}

export const getAddressList: any = createAsyncThunk(
    "addressList/get",
    async (_: void, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            console.log('stateaddress', state);
            const id_customer = state.session.user.id_customer;

            const response = await AddressService.getAddressList();
            let data = await response.data

            console.log("addresslistBARU", data)

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


export const addAddress: any = createAsyncThunk(
    "address/add",
    async ({ id_customer, id_address, id_gender, firstname, lastname, company, address1, address2, id_country, id_state, city, postcode, phone }: any, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            const id_customer = state.session.user.id_customer;

            const response = await AddressService.addAddress({ id_customer, id_address, firstname, lastname, company, address1, address2, id_country, id_state, city, postcode, phone });
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
            console.log("Error", e.response.data)
            rejectWithValue(e.response.data)
        }
    }
)

export const updateAddress: any = createAsyncThunk(
    "address/update",
    async ({ id_customer, id_address, id_gender, firstname, lastname, company, address1, address2, id_country, id_state, city, postcode, phone }: any, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            const id_customer = state.session.user.id_customer;

            const response = await AddressService.updateAddress(id_address, { id_customer, id_address, firstname, lastname, company, address1, address2, id_country, id_state, city, postcode, phone });
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
            console.log("Error", e.response.data)
            rejectWithValue(e.response.data)
        }
    }
)

export const deleteAddress: any = createAsyncThunk(
    "address/delete",
    async (id_address: any, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            const id_customer = state.session.user.id_customer;

            const response = await AddressService.deleteAddress(id_address);
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
            console.log("Error", e.response.data)
            rejectWithValue(e.response.data)
        }
    }
)

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        clearAddress: (state) => {

            // console.log('clearaddress');
            const temp: any = {};
            temp.data = null;

            state = { ...state, ...temp }
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAddressList.fulfilled, (state, { payload }) => {

            const temp: any = [];

            if (payload.data) {
                temp.data = payload.data;
                temp.id_customer = payload.data[0].id_customer;
                state = { ...state, ...temp }
            }

            // console.log('statekai', state);
            return state;
        }).addCase(getAddressList.pending, (state, { payload }) => {

        }).addCase(getAddressList.rejected, (state, { payload }) => {

            if (payload.code == 404) {
                const temp: any = {};
                // temp.id_cart = null;
                temp.data = null;

                state = { ...state, ...temp }
                return state;
            }

            // GeneralService.toast({ description: payload.message });
        }).addCase(addAddress.fulfilled, (state, { payload }) => {
            GeneralService.toast({ description: payload.message });
            const temp: any = {};
            temp.isLoading = false;
            temp.isFinish = true;
            if (payload.data) {
                state = { ...state, ...temp }
            }
            return state;
        }).addCase(addAddress.pending, (state, { payload }) => {
            const temp: any = {};
            temp.isLoading = true;
            temp.isFinish = false;
            state = { ...state, ...temp }

            return state;
        }).addCase(addAddress.rejected, (state, { payload }) => {
            const temp: any = {};
            temp.isLoading = false;
            temp.isFinish = true;
            GeneralService.toast({ description: payload.message });
            state = { ...state, ...temp }

            return state;

        }).addCase(updateAddress.fulfilled, (state, { payload }) => {
            GeneralService.toast({ description: payload.message });
            const temp: any = {};
            temp.isLoading = false;
            temp.isFinish = true;
            if (payload.data) {
                state = { ...state, ...temp }
            }
            return state;
        }).addCase(updateAddress.pending, (state, { payload }) => {
            const temp: any = {};
            temp.isLoading = true;
            temp.isFinish = false;
            state = { ...state, ...temp }

            return state;

        }).addCase(updateAddress.rejected, (state, { payload }) => {
            const temp: any = {};
            temp.isLoading = false;
            temp.isFinish = true;
            GeneralService.toast({ description: payload.message });
            state = { ...state, ...temp }

            return state;

        }).addCase(deleteAddress.fulfilled, (state, { payload }) => {
            GeneralService.toast({ description: payload.message });
        }).addCase(deleteAddress.pending, (state, { payload }) => {
        }).addCase(deleteAddress.rejected, (state, { payload }) => {
            
            GeneralService.toast({ description: payload.message });

        })
    },
})




// Action creators are generated for each case reducer function
export const { clearAddress } = addressSlice.actions

export const addressSelector = (state: any) => state.address

export default addressSlice.reducer

