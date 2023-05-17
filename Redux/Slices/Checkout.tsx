import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import AuthService from '../../Services/AuthService'
import CartService from '../../Services/CartService'
import GeneralService from '../../Services/GeneralService'
import { Message } from 'yup'
import { Alert } from 'react-native'

export interface CheckoutState {
    id_cart: Number | null,
    id_gift: Number | null,
    address: Object,
    carrier: Array<any>,
    payment: Array<any>,
    product: Array<any>,
    voucher: Array<any> | null;
    storeCredit: Array<any> | null;
    gift_wrap: any,
    gift_wrap_exist: any,
    gift_option: any,
    gift_message: String,
    total_price: String,
    total_product: String,
    discount: String
    shipping_fee: String,
}

const initialState: CheckoutState = {
    id_cart: null,
    id_gift: null,
    address: {},
    carrier: [],
    payment: [],
    product: [],
    voucher: null,
    storeCredit: null,
    gift_wrap: '',
    gift_wrap_exist: null,
    gift_option: '',
    gift_message: '',
    total_price: '',
    total_product: '',
    discount: '',
    shipping_fee: ''
}

export const getCartStep1: any = createAsyncThunk(
    "checkout/step1",
    async ({ gift, gift_wrap_id, gift_message, address_id }: any, { getState, rejectWithValue , dispatch}) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;
            const id_gift = gift_wrap_id ? gift_wrap_id : '';
            const message = gift_message ? gift_message : '';
            const gift_value = gift ? gift : '';
            const id_address = address_id

            const response = await CartService.cartStep1(id_cart, id_gift , message, gift_value);
            let data = await response.json()

            console.log('step1response' ,data.data)

            if (response.status == 200) {
                if (data.code == 200) {

                    const param = {
                        address_id: id_address
                    }

                    dispatch(getCartStep2(param))
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
    async ({ address_id }: any, { getState, rejectWithValue, dispatch }) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;
            const id_address = state.cart.address ? state.cart.address.id : address_id;

            const response = await CartService.cartStep2(id_cart, id_address);
            let data = await response.json()
            console.log("step2", data)

            if (response.status == 200) {
                if (data.code == 200) {

                    const param = {
                        address_id: id_address
                    }

                    dispatch(getCartStep3(param))
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
    async ({ address_id }: any, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;
            const id_address = address_id;
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

export const getGiftMessage: any = createAsyncThunk(
    "checkout/giftMessage",
    async ({ gift_message }: any, { getState, rejectWithValue , dispatch}) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;
            const message = gift_message ? gift_message : '';

            const response = await CartService.cartStep1(id_cart, '' , message, '');
            let data = await response.json()

            console.log('giftmessage' ,data.data)

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
            const temp: any = initialState;

            state = { ...state, ...temp }
            return state;
        },
        leaveMessageCheckout: (state, action) => {
            
            const temp: any = {};
            temp.message = action.payload;

            state = { ...state, ...temp }
            return state;
        },
        clearLeaveMessage: (state) => {

            console.log('clearleavemessage');
            const temp: any = {};
            temp.message = null;

            state = { ...state, ...temp }
            return state;
        },
        assignRefID: (state, action) => {
            
            const temp: any = {};
            console.log('refid' ,action.payload)
            temp.ref_id = action.payload;

            state = { ...state, ...temp }
            return state;
        },

        assignOrderID: (state, action) => {
            
            const temp: any = {};
            console.log('orderid' ,action.payload)
            temp.order_id = action.payload;

            state = { ...state, ...temp }
            return state;
        },

        selectPayment: (state, action) => {
            
            const temp: any = {};
            console.log('paymentselected' ,action.payload)
            temp.payment_selected = action.payload;

            state = { ...state, ...temp }
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCartStep1.fulfilled, (state, { payload }) => {
    
            const temp: any = {};
            if (payload.data) {
                temp.id_cart = payload.data.id_cart;
                temp.id_gift = Object.keys(payload.data.gift_wrap.product_val);
                temp.address = payload.data.address_delivery;
                temp.product = payload.data.product_list;
                temp.carrier = payload.data.carrier_list;
                temp.total_price = payload.data.totalPriceWt;
                temp.total_product = payload.data.totalProductsWt;
                temp.voucher = payload.data.voucher_list;
                temp.storeCredit = payload.data.store_credit_list;
                temp.gift_wrap = payload.data.gift_wrap;
                temp.gift_wrap_exist = payload.data.gift_wrap.gift_wrap_exist;
                temp.gift_option = payload.data.gift_wrap_exist;
                temp.shipping_fee = payload.data.shipping_price;
                temp.discount = payload.data.totalDiscountsWt;

                state = { ...state, ...temp }
            }

            console.log('statestep1baru', state);
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
                temp.total_price = payload.data.totalPriceWt;
                temp.total_product = payload.data.totalProductsWt;
                temp.shipping_fee = payload.data.shipping_price;
                temp.gift_option = payload.data.gift_wrap_exist;
                temp.discount = payload.data.totalDiscountsWt;
                state = { ...state, ...temp }
            }

            console.log('statestep2', state);
            return state;
        }).addCase(getCartStep2.pending, (state, { payload }) => {

        }).addCase(getCartStep2.rejected, (state, { payload }) => {
            console.log('payloapayloadreject2', payload);
        }).addCase(getCartStep3.fulfilled, (state, { payload }) => {
    
            const temp: any = {};

            if (payload.data) {
                temp.id_cart = payload.data.id_cart;
                temp.address = payload.data.address_delivery;
                temp.product = payload.data.product_list;
                temp.carrier = payload.data.carrier_list;
                temp.payment = payload.data.payment_list;
                temp.total_price = payload.data.totalPriceWt;
                temp.total_product = payload.data.totalProductsWt;
                temp.shipping_fee = payload.data.shipping_price;
                temp.gift_option = payload.data.gift_wrap_exist;
                temp.discount = payload.data.totalDiscountsWt;
                state = { ...state, ...temp }
            }

            console.log('statestep3', state);
            return state;
        }).addCase(getCartStep3.pending, (state, { payload }) => {

        }).addCase(getCartStep3.rejected, (state, { payload }) => {
            console.log('payloadreject3', payload);
            // GeneralService.toast({ description: payload.message });
        }).addCase(getGiftMessage.fulfilled, (state, { payload }) => {
    
            const temp: any = {};
            if (payload.data) {
                temp.gift_message = payload.data.cart_list.gift_message;
                state = { ...state, ...temp }
            }
            
            return state;
        }).addCase(getGiftMessage.pending, (state, { payload }) => {

        }).addCase(getGiftMessage.rejected, (state, { payload }) => {
            console.log('payloadrejectmessage', payload);
        })
    },
})

// Action creators are generated for each case reducer function
export const { clearCheckout, leaveMessageCheckout, clearLeaveMessage, assignRefID, assignOrderID, selectPayment } = checkoutSlice.actions

export const checkoutSelector = (state: any) => state.checkout

export default checkoutSlice.reducer