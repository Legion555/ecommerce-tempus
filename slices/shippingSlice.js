import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    value: null
}

export const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        updateShipping: (state, {payload}) => {
            state.value = payload
        },
        resetShipping: () => initialState
    }
})

export const {updateShipping, resetShipping} = shippingSlice.actions

export const shipping = (state) => state.shipping.value

export default shippingSlice.reducer