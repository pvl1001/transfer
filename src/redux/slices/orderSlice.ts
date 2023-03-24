import { createSlice } from "@reduxjs/toolkit"
import { TOrderFormUnion } from "../../utils/types";


type TOrderState = {
   type: string,
   step: number,
   data: TOrderFormUnion
}

const initialState: TOrderState = {
   type: '',
   step: 0,
   data: {
      // step 1
      author: '',
      ccmp: '',
      crm: '',
      msisnd: '',
      status: '',
      transfer: '',
      // step 2
      before_order_number: '',
      responsible: '',
      duplicate: 1,
      cause_transfer: '',
      // step 3
      ex_seller: '',
      next_seller: '',
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
   },
} )


export const {
   setOrderType,
   setOrderData,
   resetOrderType,
   goBack,
   goFinish,
} = orderSlice.actions
export default orderSlice.reducer