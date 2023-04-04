import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { TOrderFormUnion, TOrderResponse, TPaginationResponse, TThunkStatus } from "../../utils/types";
import { BASE_URL } from "../../utils/api";


export const thunkGetOrders = createAsyncThunk<
   { orders: TOrderResponse[], pagination: TPaginationResponse, ordersLength: number },
   number
>(
   'tableOrders/thunkGetOrders',
   async ( paginationValue = 1, { rejectWithValue } ) => {
      try {
         const { data, status } = await axios.get( `${ BASE_URL }/orders?page=${ paginationValue }` )
         if ( status === 200 ) return data
         throw new Error( 'Ошибка ' + status )
      } catch ( err ) {
         rejectWithValue( err )
         console.error( err )
      }
   }
)

export const thunkAddOrder = createAsyncThunk<TOrderResponse, TOrderFormUnion>(
   'tableOrders/thunkAddOrders',
   async ( orderForm, { rejectWithValue } ) => {
      try {
         const { status, data } = await axios.post( `${ BASE_URL }/orders`, orderForm )
         if ( status === 200 ) return data
         throw new Error( 'Ошибка ' + status )
      } catch ( err ) {
         rejectWithValue( err )
         console.error( err )
      }
   }
)

export const thunkDeleteOrder = createAsyncThunk<
   { orders: TOrderResponse[], pagination: TPaginationResponse, ordersLength: number },
   { id: number[], paginationValue: number }>(
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
   orders: TOrderResponse[]
   ordersLength: number
   pagination: TPaginationResponse
   selectedId: number[]
   status: TThunkStatus
}


const initialState: TTableOrdersState = {
   orders: [],
   ordersLength: 0,
   pagination: {
      current: 1,
      total: 0
   },
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

         state.orders = (state.orders).map( ( order: any ) => {
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
      },
   },
   extraReducers: builder => {
      builder
         .addCase( thunkGetOrders.pending, ( state ) => {
            state.status = 'loading'
         } )
         .addCase( thunkGetOrders.fulfilled, ( state, action ) => {
            const { orders, pagination, ordersLength } = action.payload
            state.orders = orders
            state.ordersLength = ordersLength
            state.pagination = pagination
            state.status = 'success'
         } )
         .addCase( thunkGetOrders.rejected, ( state ) => {
            state.orders = []
            state.status = 'error'
         } )

      builder
         .addCase( thunkAddOrder.pending, ( state ) => {
            state.status = 'loading'
         } )
         .addCase( thunkAddOrder.fulfilled, ( state, action ) => {
            state.orders.unshift( action.payload )
            state.status = 'success'
         } )
         .addCase( thunkAddOrder.rejected, ( state ) => {
            state.orders = []
            state.status = 'error'
         } )

      builder
         .addCase( thunkDeleteOrder.pending, ( state ) => {
            state.status = 'loading'
         } )
         .addCase( thunkDeleteOrder.fulfilled, ( state, action ) => {
            const { orders, pagination, ordersLength } = action.payload
            state.orders = orders
            state.ordersLength = ordersLength
            state.pagination = pagination
            state.status = 'success'
         } )
         .addCase( thunkDeleteOrder.rejected, ( state ) => {
            state.orders = []
            state.status = 'error'
         } )

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
   }
} )


export const {
   setCellOrders,
   addOrder,
   selectOrders,
   changedOff,
} = tableOrdersSlice.actions
export default tableOrdersSlice.reducer


