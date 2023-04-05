import { configureStore } from '@reduxjs/toolkit'
import { sessionSlice } from './Slices/Sessions'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { cartSlice } from './Slices/Cart';
import { productListSlice } from './Slices/ProductList';
import { searchSlice } from './Slices/Search';
import { addressSlice } from './Slices/Address';
import { addressSelectedSlice } from './Slices/AdressSelected';
import { checkoutSelector, checkoutSlice } from './Slices/Checkout';
import { infosSlice } from './Slices/Infos';
import { wishlistSlice } from './Slices/Wishlist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

// combine all reducers
const reducers = combineReducers({
    session: sessionSlice.reducer,
    cart: cartSlice.reducer,
    productList: productListSlice.reducer,
    search: searchSlice.reducer,
    address: addressSlice.reducer,
    address_selected: addressSelectedSlice.reducer,
    checkout: checkoutSlice.reducer,
    infos: infosSlice.reducer,
    wishlist: wishlistSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)