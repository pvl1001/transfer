import { createSlice } from "@reduxjs/toolkit"


export type TAlert = null | {
   severity: 'error' | 'warning' | 'success',
   message: string
}

const alertSlice = createSlice( {
   name: 'alert',
   initialState: null as TAlert,
   reducers: {
      setAlert( state, action ) {
         return action.payload
      }
   }
} )


export const { setAlert } = alertSlice.actions
export default alertSlice.reducer