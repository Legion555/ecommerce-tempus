import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    value: null
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        updateModal: (state, {payload}) => {
            state.value = payload
        },
        resetModal: () => initialState
    }
})

export const {updateModal, resetModal} = modalSlice.actions

export const modal = (state) => state.modal.value

export default modalSlice.reducer