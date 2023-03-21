import { createSlice } from "@reduxjs/toolkit"


type TState = {
   login: string
}

const initialState: TState | null = { login: 'Pavel' }
// const initialState = null

const authSlice = createSlice( {
   name: 'auth',
   initialState,
   reducers: {
      signin( state, action ) {
         return action.payload
      },
      signout( state, action ) {
         return action.payload
      }
   }
} )

export const { signin, signout } = authSlice.actions
export default authSlice.reducer