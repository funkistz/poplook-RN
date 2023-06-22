import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CartService from '../../Services/CartService'
import GeneralService from '../../Services/GeneralService'
import { Alert } from 'react-native'
import { delToCart } from '../../Redux/Slices/Cart';
export interface CheckoutState {
    id_cart: Number | null,
    id_gift: Number | null,
    address: {} | null
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
    free_order: any
}

const initialState: CheckoutState = {
    id_cart: null,
    id_gift: null,
    address: null,
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
    shipping_fee: '',
    free_order: ''
}

export const assignCheckoutAddress: any = createAsyncThunk(
    "checkout/assignCheckoutAddress",
    async ({ gift, gift_wrap_id, gift_message, address_id }: any, { getState, rejectWithValue, dispatch }) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;
            const id_gift = gift_wrap_id ? gift_wrap_id : '';
            const message = gift_message ? gift_message : '';
            const gift_value = gift ? gift : '';
            let id_address = address_id ? address_id : 0;

            const response = await CartService.cartStep1(id_cart, id_gift, message, gift_value);
            let data = await response.json()

            console.log('assignCheckoutAddress', data.data)

            if (response.status == 200) {
                if (data.code == 200) {

                    if (data.data.address_delivery) {
                        id_address = data.data.address_delivery.id;
                    }
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

export const getCartStep1: any = createAsyncThunk(
    "checkout/step1",
    async ({ gift, gift_wrap_id, gift_message }: any, { getState, rejectWithValue, dispatch }) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;
            const id_gift = gift_wrap_id ? gift_wrap_id : '';
            const message = gift_message ? gift_message : '';
            const gift_value = gift ? gift : '';

            const response = await CartService.cartStep1(id_cart, id_gift, message, gift_value);
            let data = await response.json()

            console.log('step1', data)

            if (response.status == 200) {
                if (data.code == 200) {

                    let id_address = null;

                    if (data.data.address_delivery) {
                        id_address = data.data.address_delivery ? data.data.address_delivery.id : null;
                    } else if (data.data.address_list) {
                        const dataAddress = data.data.address_list.length > 0 ? data.data.address_list[0].id_address : null;
                        id_address = dataAddress
                    }

                    if (id_address == null ) {
                        Alert.alert('', 'You do not have shipping address yet, please add a new one.', [
                            {
                                text: 'OK',
                                style: 'cancel'
                            },
                        ]);
                    }

                    const param = {
                        address_id: id_address
                    }

                    await dispatch(getCartStep2(param))
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
            let id_address = address_id;

            const response = await CartService.cartStep2(id_cart, id_address);
            let data = await response.json()
            console.log("step2", data)

            if (response.status == 200) {
                if (data.code == 200) {

                    if (!id_address) {
                        id_address = data.data.address_delivery.id;
                    }

                    const param = {
                        address_id: id_address,
                        cart_id: data.data.carrier_list[0].id_carrier
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
    async ({ address_id, cart_id }: any, { getState, rejectWithValue, dispatch }) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;
            const id_address = address_id;
            // const id_carrier = state.checkout.carrier[0].id_carrier;
            const id_carrier = cart_id;

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
                const state: any = getState();
                const products = state.checkout.product

                for (let i = 0; i < products.length; i++) {

                    if (products[i].active == 0 || products[i].quantity_available == 0) {

                        const id_product = products[i].id_product
                        const id_product_attribute = products[i].id_product_attribute

                        Alert.alert('Item out of stock', data.message + ' and will be remove from your cart.', [
                            {
                                text: 'Proceed',
                                onPress: async () => {
                                    const params = {
                                        id_cart: state.checkout.id_cart,
                                        id_product: id_product,
                                        id_product_attribute: id_product_attribute,
                                    }

                                    await dispatch(delToCart(params))

                                    const param = {
                                        gift: state.checkout.gift_option ? '1' : '0',
                                        gift_wrap_id: state.checkout.id_gift[0],
                                        gift_message: state.checkout.gift_message,
                                        address_id: state.checkout.address
                                    }
        
                                    await dispatch(getCartStep1(param))

                                }
                            },
                        ]);

                    }
                }
            }
        } catch (e: any) {
            console.log("Error", e.response.data)
            rejectWithValue(e.response.data)
        }
    }
)

export const getGiftMessage: any = createAsyncThunk(
    "checkout/giftMessage",
    async ({ gift_message }: any, { getState, rejectWithValue, dispatch }) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;
            const message = gift_message ? gift_message : '';

            const response = await CartService.cartStep1(id_cart, '', message, '');
            let data = await response.json()

            console.log('giftmessage', data.data)

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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCartStep1.fulfilled, (state, { payload }) => {

            const temp: any = {};
            const dataAddress = payload.data.address_list.length > 0 ? payload.data.address_list[0] : null;
            if (payload.data) {
                temp.id_cart = payload.data.id_cart;
                temp.id_gift = Object.keys(payload.data.gift_wrap.product_val);
                temp.address = payload.data.address_delivery ? payload.data.address_delivery : dataAddress;
                temp.product = payload.data.product_list;
                // temp.carrier = payload.data.carrier_list ? payload.dara.carrier_list : null;
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
            // GeneralService.toast({ description: payload.message });
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
            // GeneralService.toast({ description: payload.message });
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
                temp.free_order = payload.data.free_order;
                state = { ...state, ...temp }
            }

            console.log('statestep3', state);
            return state;
        }).addCase(getCartStep3.pending, (state, { payload }) => {

        }).addCase(getCartStep3.rejected, (state, { payload}) => {
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
export const { clearCheckout, leaveMessageCheckout, clearLeaveMessage } = checkoutSlice.actions

export const checkoutSelector = (state: any) => state.checkout

export default checkoutSlice.reducer
