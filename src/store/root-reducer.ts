import { combineReducers } from '@reduxjs/toolkit'
import themeReducer from 'src/slices/theme'

export const rootReducer = combineReducers({
  theme: themeReducer,
})
