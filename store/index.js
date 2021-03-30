import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import userDataReducer from '../slices/userDataSlice'
import productListReducer from '../slices/productListSlice'
import categoryListReducer from '../slices/categoryListSlice'
import cartReducer from '../slices/cartSlice'
import shippingReducer from '../slices/shippingSlice'
import orderReducer from '../slices/orderSlice'
import modalReducer from '../slices/modalSlice'
import darkModeReducer from '../slices/darkModeSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({
    userData: userDataReducer,
    productList: productListReducer,
    categoryList: categoryListReducer,
    cart: cartReducer,
    shipping: shippingReducer,
    order: orderReducer,
    modal: modalReducer,
    darkMode: darkModeReducer
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
});

export default store;