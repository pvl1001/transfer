import { createSlice } from "@reduxjs/toolkit"


const initialState: any = {}

const modalSlice = createSlice( {
   name: 'modal',
   initialState,
   reducers: {
      setModalState( state, action ) {
         return action.payload
      }
   }
} )


export const { setModalState } = modalSlice.actions
export default modalSlice.reducer