import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/authSlice'
import alert from './slices/alertSlice'
import modal from './slices/modalSlice'
import order from './slices/orderSlice'
import tableOrders from './slices/tableOrdersSlice'
import tableOperators from './slices/tableOperatorsSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore( {
   reducer: {
      auth,
      alert,
      modal,
      order,
      tableOrders,
      tableOperators,
   },
   devTools: process.env.NODE_ENV === 'development',
} )


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

export default store