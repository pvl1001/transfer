import { createSlice } from "@reduxjs/toolkit"


const initialState = {
   type: '',
   step: 0,
   // step 1
   data: {
      CCMP: '',
      CRM: '',
      MSISND: '',
      agreement: '',
      transfer: '',
      // step 2
      orderNumberBefore: '',
      author: '',
      duplicate: '',
      cause: '',
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
      }
   }
} )


export const { setOrderType, setOrderData } = orderSlice.actions
export default orderSlice.reducer