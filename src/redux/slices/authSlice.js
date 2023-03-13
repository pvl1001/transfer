import { createSlice } from "@reduxjs/toolkit"

const initialState = { login: 'Pavel' }
// const initialState = null

const authSlice = createSlice( {
   name: 'auth',
   initialState,
   reducers: {
      signin( state, action ) {
         return action.payload
      },
      signout() {
         return null
      }
   }
} )

export const { signin, signout } = authSlice.actions
export default authSlice.reducer