import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { TOrderResponse } from "../../utils/types";
import { BASE_URL } from "../../utils/api";


export const thunkGetOrders = createAsyncThunk<TOrderResponse[]>(
   'tableOrders/thunkGetOrders',
   async ( _, { rejectWithValue } ) => {
      try {
         const { data, status } = await axios.get( `${ BASE_URL }/orders` )
         if ( status === 200 ) return data
         throw new Error( 'Ошибка ' + status )
      } catch ( err ) {
         rejectWithValue( err )
         console.error( err )
      }
   }
)


export const thunkDeleteOrder = createAsyncThunk<TOrderResponse[], number[]>(
   'tableOrders/thunkDeleteOrder',
   async ( selectedId, { rejectWithValue } ) => {
      try {
         const { data, status } = await axios.delete( `${ BASE_URL }/orders`, { data: selectedId } )
         if ( status === 200 ) return data
         throw new Error( 'Ошибка удаления заявки. Код: ' + status )
      } catch ( err ) {
         rejectWithValue( err )
         console.error( err )
      }
   }
)

export const thunkUpdateOrder = createAsyncThunk<TOrderResponse[], any>(
   'tableOrders/thunkUpdateOrder',
   async ( row, { dispatch, rejectWithValue } ) => {
      try {
         const { data, status } = await axios.put( `${ BASE_URL }/orders`, row )
         if ( status === 200 ) {
            dispatch( changedOff( row ) )
            return data
         }
         throw new Error( 'Ошибка удаления заявки. Код: ' + status )
      } catch ( err ) {
         rejectWithValue( err )
         console.error( err )
      }
   }
)


type TTableOrdersState = {
   orders: TOrderResponse[],
   selectedId: number[]
   status: null | 'loading' | 'success' | 'error',
}


const initialState: TTableOrdersState = {
   orders: [],
   selectedId: [],
   status: null,
}

const tableOrdersSlice = createSlice( {
   name: 'tableOrders',
   initialState,
   reducers: {
      setCellOrders( state, action ) {
         const { rowIndex, columnId, value } = action.payload

         state.orders = state.orders.map( ( row, index ) => {
            if ( index === rowIndex ) {
               return {
                  ...state.orders[rowIndex],
                  [columnId]: value,
                  changed: true
               }
            }
            return row
         } )
      },
      changedOff( state, action ) {
         const row = action.payload

         state.orders = state.orders.map( order => {
            if ( order.changed !== undefined ) {
               if ( order.id === row.id ) order.changed = false
            }
            return order
         } )
      },
      addOrder( state, action ) {
         state.orders.push( action.payload )
      },
      selectOrders( state, action ) {
         state.selectedId = action.payload
      }
   },
   extraReducers: builder => {
      builder
         .addCase( thunkUpdateOrder.pending, ( state ) => {
            state.status = 'loading'
         } )
         .addCase( thunkUpdateOrder.fulfilled, ( state ) => {
            // state.orders = action.payload
            state.status = 'success'
         } )
         .addCase( thunkUpdateOrder.rejected, ( state ) => {
            state.orders = []
            state.status = 'error'
         } )

      builder
         .addCase( thunkDeleteOrder.pending, ( state ) => {
            state.status = 'loading'
         } )
         .addCase( thunkDeleteOrder.fulfilled, ( state, action ) => {
            state.orders = action.payload
            state.status = 'success'
         } )
         .addCase( thunkDeleteOrder.rejected, ( state ) => {
            state.orders = []
            state.status = 'error'
         } )

      builder
         .addCase( thunkGetOrders.pending, ( state ) => {
            state.status = 'loading'
         } )
         .addCase( thunkGetOrders.fulfilled, ( state, action ) => {
            state.orders = action.payload
            state.status = 'success'
         } )
         .addCase( thunkGetOrders.rejected, ( state ) => {
            state.orders = []
            state.status = 'error'
         } )
   }
} )


export const { setCellOrders, addOrder, selectOrders, changedOff } = tableOrdersSlice.actions
export default tableOrdersSlice.reducer


