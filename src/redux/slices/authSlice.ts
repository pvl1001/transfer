import { createSlice } from "@reduxjs/toolkit"


type TAuthState = {
   login: string,
   user: {
      name: string
   }
}

const initialState: TAuthState | null = {
   login: 'Pavel',
   user: {
      name: 'Иванов Иван Иванович'
   }
}
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