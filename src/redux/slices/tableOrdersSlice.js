import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


export const fetchGetOrders = createAsyncThunk(
   'tableOrders/fetchGetOrders',
   async () => {
      const { data } = await axios.get( 'http://localhost:8080/api/orders' )
      return data.data
   }
)


const initialState = {
   orders: [],
   status: null,
}

const tableOrdersSlice = createSlice( {
   name: 'tableOrders',
   initialState,
   reducers: {
      setTableOrders( state, action ) {
         const { rowIndex, columnId, value } = action.payload

         state.orders = state.orders.map( ( row, index ) => {
            if ( index === rowIndex ) {
               return {
                  ...state.orders[rowIndex],
                  [columnId]: value,
               }
            }
            return row
         } )
      }
   },
   extraReducers: builder => {
      builder
         .addCase( fetchGetOrders.pending, ( state ) => {
            state.status = 'loading'
         } )
         .addCase( fetchGetOrders.fulfilled, ( state, action ) => {
            state.orders = action.payload
            state.status = 'success'
         } )
         .addCase( fetchGetOrders.rejected, ( state ) => {
            state.status = 'error'
            state.orders = []
         } )
   }
} )


export const { setTableOrders } = tableOrdersSlice.actions
export default tableOrdersSlice.reducer


