import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/authSlice.js'
import modal from './slices/modalSlice.js'
import order from './slices/orderSlice.js'

export const store = configureStore( {
   reducer: {
      auth,
      modal,
      order,
   },
   devTools: process.env.NODE_ENV === 'development',
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware( {
         serializableCheck: false,
      } )
} )

export default store