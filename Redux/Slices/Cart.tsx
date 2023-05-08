import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import AuthService from '../../Services/AuthService'
import CartService from '../../Services/CartService'
import GeneralService from '../../Services/GeneralService'

export interface CartState {
    id_cart: Number | null,
    data: {} | null;
}

const initialState: CartState = {
    id_cart: null,
    data: {}
}

export const getCart: any = createAsyncThunk(
    "cart/get",
    async (_: void, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;
            const response = await CartService.getCart(id_cart);
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

export const addToCart: any = createAsyncThunk(
    "cart/add",
    async ({ id_product, id_product_attribute, quantity }: any, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            const id_cart = state.cart.id_cart;

            console.log("state before", state)


            const response = await CartService.addToCart({ id_cart, id_product, id_product_attribute, quantity });
            let data = await response.json()
            console.log("response", response)
            console.log("data", data)

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
            console.log("Error", e.response.data)
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

            console.log('id_product: ', id_product)

            const response = await CartService.delToCart({ id_cart, id_product, id_product_attribute });
            let data = await response.json()
            console.log("response", response)
            console.log("data", data)

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
            console.log("Error", e.response.data)
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

            console.log('clearcart');
            const temp: any = {};
            temp.id_cart = null;
            temp.data = null;

            state = { ...state, ...temp }
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(addToCart.fulfilled, (state, { payload }) => {
            GeneralService.toast({ description: payload.message });
            const temp: any = {};
            if (payload.data) {
                temp.id_cart = payload.data.id_cart;
                state = { ...state, ...temp }
            }
            return state;
        })
        .addCase(addToCart.pending, (state, { payload }) => {
        })
        .addCase(addToCart.rejected, (state, { payload }) => {

            GeneralService.toast({ description: payload.message });

        })
        
        .addCase(getCart.fulfilled, (state, { payload }) => {

            const temp: any = {};
            if (payload.data) {
                temp.id_cart = payload.data.id_cart;
                temp.data = payload.data;
                state = { ...state, ...temp }
            }

            console.log('stategetcart', state);
            return state;
        })
        .addCase(getCart.pending, (state, { payload }) => {

        })
        .addCase(getCart.rejected, (state, { payload }) => {
            console.log('payload', payload);
            GeneralService.toast({ description: payload.message });
            if (payload.code == 404) {
                const temp: any = {};
                temp.id_cart = null;
                temp.data = null;

                state = { ...state, ...temp }
                return state;
            }
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

// Action creators are generated for each case reducer function
export const { clearCart, assignCartId } = cartSlice.actions

export const cartSelector = (state: any) => state.cart

export default cartSlice.reducer
