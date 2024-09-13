import type { ThemeState } from "src/types/redux/theme-state"

import { createSlice } from "@reduxjs/toolkit"

const initialState: ThemeState = {
    mode: "dark",
}

const slice = createSlice({
    initialState,
    name: "theme",
    reducers: {
        toggleTheme(state) {
            state.mode = state.mode === "dark" ? "light" : "dark"
        },
    },
})

export const { toggleTheme } = slice.actions

export default slice.reducer
