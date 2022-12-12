import { configureStore } from '@reduxjs/toolkit'
import test from './slices/testSlice'

export const store = configureStore( {
   reducer: {
      test
   },
   devTools: process.env.NODE_ENV === 'development',
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware( {
         serializableCheck: false,
      } )
} )

export default store