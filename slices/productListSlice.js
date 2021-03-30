import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    value: []
}

export const productListSlice = createSlice({
    name: 'productList',
    initialState,
    reducers: {
        updateProductList: (state, {payload}) => {
            state.value = payload
        },
        addToProductList: (state, {payload}) => {
            state.value.push(payload)
        },
        removeFromProductList: (state, {payload}) => {
            state.value.splice(payload, 1);
        },
        updateProduct: (state, {payload}) => {
            state.value[payload.index] = {...payload.product};
        }
    }
})

export const {updateProductList, addToProductList, removeFromProductList, updateProduct} = productListSlice.actions

export const productList = (state) => state.productList.value

export default productListSlice.reducer