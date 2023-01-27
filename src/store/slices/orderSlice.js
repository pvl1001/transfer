import { createSlice } from "@reduxjs/toolkit"


const initialState = {
   type: '',
   step: 0,
   // step 1
   data: {
      // step 1
      CCMP: '',
      CRM: '',
      MSISND: '',
      agreement: '',
      transfer: '',
      // step 2
      orderNumberBefore: '',
      author: '',
      duplicate: 1,
      cause: '',
      // step 3
      exSeller: '',
      nextSeller: '',
   }

}

const orderSlice = createSlice( {
   name: 'order',
   initialState,
   reducers: {
      setOrderType( state, action ) {
         state.step += 1
         state.type = action.payload
      },
      setOrderData( state, action ) {
         state.step += 1
         state.data = { ...state.data, ...action.payload }
      },
      goBack( state ) {
         state.step -= 1
      }
   }
} )


export const {
   setOrderType,
   setOrderData,
   goBack,
} = orderSlice.actions
export default orderSlice.reducer