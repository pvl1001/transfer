import { createSlice } from "@reduxjs/toolkit"

// const initialState = { login: 'Pavel' }
const auth = createSlice( {
   name: 'auth',
   initialState: null,
   reducers: {
      signin( state, action ) {
         return action.payload
      },
      signout() {
         return null
      }
   }
} )

export const { signin, signout } = auth.actions
export default auth.reducer