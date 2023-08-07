import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CartService from '../../Services/CartService'
import GeneralService from '../../Services/GeneralService'

export interface CartState {
    id_cart: Number | null,
    total_item: 0,
    cartLoading: boolean,
    data: {} | null
}

const initialState: CartState = {
    id_cart: null,
    total_item: 0,
    cartLoading: false,
    data: {}
}

export const getCart: any = createAsyncThunk(
    "cart/get",
    async (_: void, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;

            const response = await CartService.getCart(id_cart);
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

export const addToCart: any = createAsyncThunk(
    "cart/add",
    async ({ id_product, id_product_attribute, quantity }: any, { getState, rejectWithValue, dispatch }) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;
            const id_customer = state.session.user ? state.session.user.id_customer : null;
            const id_shop = state.session.country.id_shop;

            let params: any = { id_cart, id_product, id_product_attribute, quantity, id_shop };

            if (id_customer) {
                params.id_customer = id_customer;
            }

            const response = await CartService.addToCart(id_cart, params);
            let data = await response.data

            if (response.status == 201) {
                if (data.code == 201) {
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

export const delToCart: any = createAsyncThunk(
    "cart/delete",
    async ({ id_product, id_product_attribute }: any, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;

            const response = await CartService.delToCart(id_cart, id_product, id_product_attribute);
            let data = await response.data

            if (response.status == 201) {
                if (data.code == 201) {

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

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        assignCartId: (state, action) => {

            console.log('assignCartId');
            const temp: any = {};
            temp.id_cart = action.payload;

            state = { ...state, ...temp }
            return state;
        },
        clearCart: (state) => {

            console.log('clearcart', state);
            const temp: any = {};
            temp.id_cart = null;
            temp.data = {};
            temp.total_item = 0;

            state = { ...state, ...temp }
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, { payload }) => {

            GeneralService.toast({ description: payload.message });
            const temp: any = {};
            if (payload.data) {

                temp.id_cart = payload.data.id_cart;
                temp.total_item = payload.data.totalItemInCart;
                temp.cartLoading = false;

                state = { ...state, ...temp }
            }
            return state;
        })
            .addCase(addToCart.pending, (state, { payload }) => {

                const temp: any = {};
                temp.cartLoading = true;

                state = { ...state, ...temp }

                return state;
            })
            .addCase(addToCart.rejected, (state, { payload }) => {

                GeneralService.toast({ description: payload.message });
                const temp: any = {};
                temp.cartLoading = false;

                state = { ...state, ...temp }

                return state;
            })

            .addCase(getCart.fulfilled, (state, { payload }) => {

                const temp: any = {};

                if (payload.data) {

                    temp.id_cart = payload.data.id_cart;
                    temp.data = payload.data;
                    temp.total_item = payload.data.totalItemInCart;
                    state = { ...state, ...temp }
                }
                return state;

            })
            .addCase(getCart.rejected, (state, { payload }) => {
                
                // GeneralService.toast({ description: payload.message });
                if (payload.code == 404) {
                    const temp: any = {};
                    // temp.id_cart = null;
                    temp.data = {};
                    temp.total_item = 0;

                    state = { ...state, ...temp }
                    return state;
                }
            })

            .addCase(getCart.pending, (state, { payload }) => {

            })

            .addCase(delToCart.fulfilled, (state, { payload }) => {
                GeneralService.toast({ description: payload.message });
                return state;
            })
            .addCase(delToCart.pending, (state, { payload }) => {
            })
            .addCase(delToCart.rejected, (state, { payload }) => {

                GeneralService.toast({ description: payload.message });

            })
    },
})

export const { clearCart, assignCartId } = cartSlice.actions

export const cartSelector = (state: any) => state.cart

export default cartSlice.reducer