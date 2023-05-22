import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import AuthService from '../../Services/AuthService'
import CartService from '../../Services/CartService'
import GeneralService from '../../Services/GeneralService'
import WishlistService from '../../Services/WishlistService'
import { getCart } from './Cart'

export interface WishlistState {
    // id_wishlist: Number | null,
    data: {} | null;
    id_product: any;
}

const initialState: WishlistState = {
    // id_wishlist: null,
    data: {},
    id_product: []
}

export const getWishList: any = createAsyncThunk(
    "wishlist/get",
    async (_: void, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            const id_customer = state.session.user.id_customer;

            const response = await WishlistService.getWishlist(id_customer);
            let data = await response.json()

            if (data.code == 200) {
                return data
            } else if (data.code == 404) {
                return data
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
    "wishlist/addCart",
    async ({ id_product, id_product_attribute, quantity }: any, { getState, rejectWithValue, dispatch }) => {
        try {
            const state: any = getState();
            const user = state.session.user;

            const params = {
                id_product: id_product,
                id_product_attribute: id_product_attribute,
                quantity: quantity.toString(),
                id_wishlist: user.id_wishlist.toString(),
                id_customer: user.id_customer.toString(),
                id_cart: user.id_cart
            }

            // console.log('params: ', params)


            const response = await WishlistService.addToCart(params);
            let data = await response.json()
            // console.log("data", data)

            if (response.status == 201) {
                if (data.code == 201) {
                    dispatch(getCart())
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

export const addToWishlist: any = createAsyncThunk(
    "wishlist/addWishlist",
    async ({ id_product, id_product_attribute }: any, { getState, rejectWithValue, dispatch }) => {
        try {
            const state: any = getState();
            const user = state.session.user;

            const params = {
                id_product: id_product,
                id_product_attribute: id_product_attribute,
                quantity: 1,
                id_wishlist: user.id_wishlist.toString(),
                id_customer: user.id_customer.toString(),
            }


            console.log('addToWishlist');
            const response = await WishlistService.addToWishlist(params);
            let data = await response.json()
            console.log("data", data)

            if (response.status == 201) {
                if (data.code == 201) {
                    dispatch(getWishList())
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

export const delWishlist: any = createAsyncThunk(
    "wishlist/delete",
    async ({ id_product, id_product_attribute }: any, { getState, rejectWithValue, dispatch }) => {
        try {
            const state: any = getState();
            const user = state.session.user;

            // console.log("state before", state)

            const response = await WishlistService.deleteWishlist(user.id_customer, user.id_wishlist, id_product, id_product_attribute);
            let data = await response.json()
            // console.log("data", data)

            if (response.status == 200) {
                if (data.code == 200) {
                    dispatch(getWishList())
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

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        clearCart: (state) => {

            console.log('clearcart');
            const temp: any = {};
            temp.data = null;

            state = { ...state, ...temp }
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, { payload }) => {
                console.log('addToCart fulfilled');
                GeneralService.toast({ description: payload.message });
                return state;
            })
            .addCase(addToCart.pending, (state, { payload }) => {
            })
            .addCase(addToCart.rejected, (state, { payload }) => {
                console.log('addToCart rejected');
                GeneralService.toast({ description: payload.message });



            })

            .addCase(addToWishlist.fulfilled, (state, { payload }) => {
                console.log('payload: ', payload)
                GeneralService.toast({ description: payload.message });
                return state;
            })
            .addCase(addToWishlist.pending, (state, { payload }) => {
            })
            .addCase(addToWishlist.rejected, (state, { payload }) => {

                GeneralService.toast({ description: payload.message });



            })

            .addCase(getWishList.fulfilled, (state, { payload }) => {

                const temp: any = {};
                // console.log('payload test: ', payload)
                if (payload.code == 200) {
                    temp.data = payload.data;
                    temp.id_product = payload.data.product_list.map((product: any) => product.id_product);
                    state = { ...state, ...temp }
                } else if (payload.code == 404) {
                    temp.data = {};
                    temp.id_product = [];
                    state = { ...state, ...temp }
                }


                // console.log('stategetwishlist', state);
                return state;
            })
            .addCase(getWishList.pending, (state, { payload }) => {

            })
            .addCase(getWishList.rejected, (state, { payload }) => {
                console.log('payload', payload);
                const temp: any = {};
                temp.data = {};
                temp.id_product = [];
                state = { ...state, ...temp }
                return state;
                // GeneralService.toast({ description: payload.message });
            })

            .addCase(delWishlist.fulfilled, (state, { payload }) => {
                // GeneralService.toast({ description: payload.message });
                return state;
            })
            .addCase(delWishlist.pending, (state, { payload }) => {

            })
            .addCase(delWishlist.rejected, (state, { payload }) => {
                console.log('payload', payload);
                // GeneralService.toast({ description: payload.message });
            })


    },
})

// Action creators are generated for each case reducer function
export const { } = wishlistSlice.actions

export const wishlistSelector = (state: any) => state.wishlist

export default wishlistSlice.reducer