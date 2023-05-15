import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TFormData, TThunkStatus, TUser } from "../../utils/types";
import { setCookie } from "../../utils/setCookie";
import { request } from "../../utils/api";


export const thunkLogin = createAsyncThunk<TUser | any, TFormData>(
   'auth/thunkLogin',
   async ( data, { dispatch, rejectWithValue } ) => {
      try {
         const res = await request.post( 'auth', data )
         if ( res.data ) {
            setCookie( 'user', JSON.stringify( res.data ) )
            return res.data
         }
      } catch ( err: any ) {
         return rejectWithValue( err.response?.data.message )
      }
   }
)


type TAuthState = {
   user: null | TUser,
   status: TThunkStatus
   error: string,
}

const initialState: TAuthState = {
   // user: {
   //    email: 'admin@mail.ru',
   //    name: 'Иванов Иван Иванович',
   //    role: 'Администратор',
   //    // role: 'Старший оператор',
   //    // role: 'Оператор',
   // },
   user: null,
   status: null,
   error: ''
}

const authSlice = createSlice( {
   name: 'auth',
   initialState,
   reducers: {
      setUser( state, action ) {
         state.user = action.payload
      },
      signout( state ) {
         state.user = null
      }
   },
   extraReducers: builder => {
      builder
         .addCase( thunkLogin.pending, ( state ) => {
            state.status = 'loading'
            state.error = ''
         } )
         .addCase( thunkLogin.fulfilled, ( state, action ) => {
            state.user = action.payload
            state.status = 'success'
            state.error = ''
         } )
         .addCase( thunkLogin.rejected, ( state, action ) => {
            state.status = 'error'
            state.error = action.payload as string
         } )
   }
} )

export const { signout, setUser } = authSlice.actions
export default authSlice.reducer