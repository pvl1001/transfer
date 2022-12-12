import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/authSlice'

export const store = configureStore( {
   reducer: {
      auth
   },
   devTools: process.env.NODE_ENV === 'development',
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware( {
         serializableCheck: false,
      } )
} )

export default store