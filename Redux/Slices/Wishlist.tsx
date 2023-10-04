import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import GeneralService from '../../Services/GeneralService'
import WishlistService from '../../Services/WishlistService'
import { getCart } from './Cart'

export interface WishlistState {
    id_wishlist: Number | null,
    data: {} | null;
    id_product: any;
}

const initialState: WishlistState = {
    id_wishlist: null,
    data: {},
    id_product: []
}

export const getWishList: any = createAsyncThunk(
    "wishlist/get",
    async (_: void, { getState, rejectWithValue, dispatch }) => {
        try {
            const state: any = getState();
            const id_customer = state.session.user.id_customer;

            const response = await WishlistService.getWishlist(id_customer);
            let data = await response.data

            if (data.code == 200) {
                dispatch(assignWishlistId(data.data.id_wishlist));
                return data
            } else {
                return rejectWithValue(data)
            }
        } catch (e: any) {
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
            const cart = state.cart;
            const id_wishlist = state.wishlist.id_wishlist;

            const params = {
                id_product: id_product,
                id_product_attribute: id_product_attribute,
                quantity: quantity.toString(),
                id_wishlist: id_wishlist,
                id_customer: user.id_customer.toString(),
                id_cart: cart.id_cart
            }

            const response = await WishlistService.addToCart(id_wishlist, params);
            let data = await response.data

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
            const id_wishlist = state.wishlist.id_wishlist == '' ? 0 : state.wishlist.id_wishlist;

            const params = {
                id_product: id_product,
                id_product_attribute: id_product_attribute,
                quantity: 1,
                id_wishlist: id_wishlist,
                id_customer: user.id_customer.toString()
            }

            const response = await WishlistService.addToWishlist(id_wishlist, params);
            let data = await response.data

            if (response.status == 201) {
                if (data.code == 201) {

                    if (id_wishlist == 0) {
                        dispatch(assignWishlistId(data.data.id_wishlist));
                    }

                    await dispatch(getWishList())
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

export const delWishlist: any = createAsyncThunk(
    "wishlist/delete",
    async ({ id_product, id_product_attribute }: any, { getState, rejectWithValue, dispatch }) => {
        try {
            const state: any = getState();
            const user = state.session.user;
            const id_wishlist = state.wishlist.id_wishlist;

            const response = await WishlistService.deleteWishlist(user.id_customer, id_wishlist, id_product, id_product_attribute);
            let data = await response.data

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
            rejectWithValue(e.response.data)
        }
    }
)

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        assignWishlistId: (state, action) => {

            const temp: any = {};
            temp.id_wishlist = action.payload

            state = { ...state, ...temp }

            return state;
        },
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

                GeneralService.toast({ description: payload.message });

                return state;

            })
            .addCase(addToCart.pending, (state, { payload }) => {
            })
            .addCase(addToCart.rejected, (state, { payload }) => {

                GeneralService.toast({ description: payload.message });

            })

            .addCase(addToWishlist.fulfilled, (state, { payload }) => {

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

                temp.data = payload.data;
                temp.id_product = payload.data.product_list.map((product: any) => product.id_product);
                state = { ...state, ...temp }
              
                return state;
            })
            .addCase(getWishList.pending, (state, { payload }) => {

            })
            .addCase(getWishList.rejected, (state, { payload }) => {

                const temp: any = {};
                temp.data = {};
                temp.id_product = [];
                state = { ...state, ...temp }
                return state;
                
            })

            .addCase(delWishlist.fulfilled, (state, { payload }) => {
                // GeneralService.toast({ description: payload.message });
                return state;
            })
            .addCase(delWishlist.pending, (state, { payload }) => {

            })
            .addCase(delWishlist.rejected, (state, { payload }) => {
                // GeneralService.toast({ description: payload.message });
            })


    },
})

export const { assignWishlistId }  = wishlistSlice.actions

export const wishlistSelector = (state: any) => state.wishlist

export default wishlistSlice.reducer