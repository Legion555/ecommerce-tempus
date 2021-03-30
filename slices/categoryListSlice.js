import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    value: []
}

export const categoryListSlice = createSlice({
    name: 'categoryList',
    initialState,
    reducers: {
        updateCategoryList: (state, {payload}) => {
            state.value = payload
        },
        addToCategoryList: (state, {payload}) => {
            state.value.push(payload)
        },
        removeFromCategoryList: (state, {payload}) => {
            state.value.splice(payload, 1);
        },
        resetCategoryList: () => initialState
    }
})

export const {updateCategoryList, addToCategoryList, removeFromCategoryList, resetCategoryList} = categoryListSlice.actions

export const categoryList = (state) => state.categoryList.value

export default categoryListSlice.reducer