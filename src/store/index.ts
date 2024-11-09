import type { TypedUseSelectorHook } from "react-redux"
import type { ThunkAction } from "redux-thunk"

import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux"

import { type AnyAction, configureStore } from "@reduxjs/toolkit"

import rootReducer from "./root-reducer"

export const store = configureStore({
    devTools: process.env.REACT_APP_ENABLE_REDUX_DEV_TOOLS === "true",
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export const useDispatch = () => useReduxDispatch<AppDispatch>()
