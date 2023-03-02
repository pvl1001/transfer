import { createSlice } from "@reduxjs/toolkit"


const initialState = {
   type: '',
   step: 0,
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
         if ( state.step === 0 ) state.step += 1
         state.type = action.payload
      },
      setOrderData( state, action ) {
         state.step += 1
         if ( action.payload ) state.data = { ...state.data, ...action.payload }
      },
      resetOrderType( state ) {
         state.type = ''
      },
      goBack( state ) {
         state.step -= 1
      },
      goFinish() {
         return initialState
      }
   }
} )


export const {
   setOrderType,
   setOrderData,
   resetOrderType,
   goBack,
   goFinish,
} = orderSlice.actions
export default orderSlice.reducer