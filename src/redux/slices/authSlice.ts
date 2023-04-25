import { createSlice } from "@reduxjs/toolkit"
import { TUser } from "../../utils/types";


type TAuthState = {
   user: null | TUser
}

const initialState: TAuthState = {
   user: {
      email: 'test@mail.ru',
      name: 'Иванов Иван Иванович',
      // role: 'Администратор',
      role: 'Старший оператор',
      // role: 'Оператор',
   }
}
// const initialState: TAuthState = {
//    user: null
// }

const authSlice = createSlice( {
   name: 'auth',
   initialState,
   reducers: {
      signin( state, action ) {
         state.user = action.payload
      },
      signout( state ) {
         state.user = null
      }
   }
} )

export const { signin, signout } = authSlice.actions
export default authSlice.reducer