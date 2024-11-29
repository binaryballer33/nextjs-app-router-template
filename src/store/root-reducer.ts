import { combineReducers } from "@reduxjs/toolkit"

import themeReducer from "@/slices/theme"

const rootReducer = combineReducers({
    theme: themeReducer,
})

export default rootReducer
