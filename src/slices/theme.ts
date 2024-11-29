// TODO: remove this code later, i think next-themes handles this
import type { ThemeState } from "@/types/redux/theme-state"

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
