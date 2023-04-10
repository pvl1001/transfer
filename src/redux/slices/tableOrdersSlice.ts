import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios, { Method } from "axios";
import {
   TOrdersCount,
   TOrderResponse,
   TPaginationResponse, TTabValue,
   TThunkOrderResponse,
   TThunkStatus
} from "../../utils/types";
import { BASE_URL } from "../../utils/api";
import { ORDERS_ALL } from "../../utils/variables";


export const thunkGetOrders = createAsyncThunk<
   TThunkOrderResponse,
   { method: Method, query?: string, payload?: any }
>(
   'tableOrders/thunkGetOrders',
   async ( { method, query = '', payload }, { dispatch, rejectWithValue } ) => {
      try {
         const { data, status } = await axios( `${ BASE_URL }/orders${ query }`, {
            method,
            data: payload
         } )
         if ( status === 200 ) {
            if ( method === 'PUT' ) dispatch( changedOff( payload.row ) )
            return data
         }
         throw new Error( 'Ошибка ' + status )
      } catch ( err ) {
         rejectWithValue( err )
         console.error( err )
      }
   }
)


type TTableOrdersState = {
   orders: TOrderResponse[]
   count: TOrdersCount,
   pagination: TPaginationResponse
   tab: { value: TTabValue, index: number },
   sortStatus: 'DESC' | 'ASC'
   selectedId: number[]
   status: TThunkStatus
}

const initialState: TTableOrdersState = {
   orders: [],
   count: {
      all: 0,
      agreed: 0,
      noagreed: 0
   },
   pagination: {
      current: 1,
      total: 0
   },
   tab: { value: ORDERS_ALL, index: 0 },
   sortStatus: 'DESC',
   selectedId: [],
   status: null,
}

const tableOrdersSlice = createSlice( {
   name: 'tableOrders',
   initialState,
   reducers: {
      setCurrentTab( state, action ) {
         state.tab = action.payload
      },
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
            const { orders, pagination, count, sortStatus } = action.payload
            state.orders = orders
            state.count = count
            state.pagination = pagination
            state.sortStatus = sortStatus
            state.status = 'success'
         } )
         .addCase( thunkGetOrders.rejected, ( state ) => {
            state.orders = []
            state.status = 'error'
         } )
   }
} )


export const {
   setCurrentTab,
   setCellOrders,
   selectOrders,
   changedOff,
} = tableOrdersSlice.actions
export default tableOrdersSlice.reducer


