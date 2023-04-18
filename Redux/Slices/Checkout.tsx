import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import AuthService from '../../Services/AuthService'
import CartService from '../../Services/CartService'
import GeneralService from '../../Services/GeneralService'

export interface CheckoutState {
    id_cart: Number | null,
    id_gift: Number | null,
    address: Object,
    carrier: Array<any>,
    payment: Array<any>,
    product: Array<any>,
    voucher: Array<any> | null;
    gift_wrap: any,
    total: String
}

const initialState: CheckoutState = {
    id_cart: null,
    id_gift: null,
    address: {},
    carrier: [],
    payment: [],
    product: [],
    voucher: null,
    gift_wrap: '',
    total: ''
}

export const getCartStep1: any = createAsyncThunk(
    "checkout/step1",
    async ({ gift }: any, { getState, rejectWithValue , dispatch}) => {
        try {
            const state: any = getState();
            console.log('giftvalue', gift)
            const id_cart = state.cart.id_cart;
            const id_gift = '22610' //checking if null
            const message = 'Goodluck'; //checking if null
            const gift2 = gift ? gift : '';
            // console.log('giftvalue' ,gift)

            const response = await CartService.cartStep1(id_cart, id_gift , message, gift2);
            let data = await response.json()
            console.log("step1result", data)

            if (response.status == 200) {
                if (data.code == 200) {
                    dispatch(getCartStep2())
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

export const getCartStep2: any = createAsyncThunk(
    "checkout/step2",
    async (_: void, { getState, rejectWithValue, dispatch }) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;
            const id_address = state.checkout.address.id;

            console.log("state2", state)

            const response = await CartService.cartStep2(id_cart, id_address);
            let data = await response.json()
            console.log("step2", data)

            if (response.status == 200) {
                if (data.code == 200) {
                    dispatch(getCartStep3())
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

export const getCartStep3: any = createAsyncThunk(
    "checkout/step3",
    async (_: void, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;
            const id_address = state.checkout.address.id;
            const id_carrier = state.checkout.carrier[0].id_carrier;

            const response = await CartService.cartStep3(id_cart, id_address, id_carrier);
            let data = await response.json()
            console.log("step3", data)

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


export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        clearCheckout: (state) => {

            console.log('clearcheckout');
            const temp: any = {};
            temp.data = null;

            state = { ...state, ...temp }
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCartStep1.fulfilled, (state, { payload }) => {
    
            const temp: any = {};
            if (payload.data) {
                temp.id_cart = payload.data.id_cart;
                temp.id_gift = Object.keys(payload.data.gift_wrap);
                temp.address = payload.data.address_delivery;
                temp.product = payload.data.product_list;
                temp.carrier = payload.data.carrier_list;
                temp.total = payload.data.totalProducts;
                temp.voucher = payload.data.voucher_list;
                temp.gift_wrap = payload.data.gift_wrap;

                state = { ...state, ...temp }
            }

            console.log('statestep1', state);
            return state;
        }).addCase(getCartStep1.pending, (state, { payload }) => {

        }).addCase(getCartStep1.rejected, (state, { payload }) => {
            console.log('payloadreject1', payload);
        }).addCase(getCartStep2.fulfilled, (state, { payload }) => {
    
            const temp: any = {};

            if (payload.data) {
                temp.id_cart = payload.data.id_cart;
                temp.address = payload.data.address_delivery;
                temp.product = payload.data.product_list;
                temp.carrier = payload.data.carrier_list;
                temp.total = payload.data.totalProducts;
                state = { ...state, ...temp }
            }

            console.log('statestep2', state);
            return state;
        }).addCase(getCartStep2.pending, (state, { payload }) => {

        }).addCase(getCartStep2.rejected, (state, { payload }) => {
            console.log('payloapayloadreject2', payload);
            // GeneralService.toast({ description: payload.message });
        }).addCase(getCartStep3.fulfilled, (state, { payload }) => {
    
            const temp: any = {};

            if (payload.data) {
                temp.id_cart = payload.data.id_cart;
                temp.address = payload.data.address_delivery;
                temp.product = payload.data.product_list;
                temp.carrier = payload.data.carrier_list;
                temp.payment = payload.data.payment_list;
                temp.total = payload.data.totalProducts;
                state = { ...state, ...temp }
            }

            console.log('statestep3', state);
            return state;
        }).addCase(getCartStep3.pending, (state, { payload }) => {

        }).addCase(getCartStep3.rejected, (state, { payload }) => {
            console.log('payloadreject3', payload);
            // GeneralService.toast({ description: payload.message });
        })
    },
})

// Action creators are generated for each case reducer function
export const { clearCheckout } = checkoutSlice.actions

export const checkoutSelector = (state: any) => state.checkout

export default checkoutSlice.reducer