import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    value: false
}

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        updateDarkMode: (state, {payload}) => {
            state.value = payload
        },
        resetDarkMode: () => initialState
    }
})

export const {updateDarkMode, resetDarkMode} = darkModeSlice.actions

export const darkMode = (state) => state.darkMode.value

export default darkModeSlice.reducer