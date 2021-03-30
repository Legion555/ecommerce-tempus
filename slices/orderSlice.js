import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    value: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        updateOrder: (state, {payload}) => {
            state.value = payload
        },
        resetOrder: () => initialState
    }
})

export const {updateOrder, resetOrder} = orderSlice.actions

export const order = (state) => state.order.value

export default orderSlice.reducer