import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios, { Method } from "axios";
import {
   TOrdersCount,
   TOrderResponse,
   TPaginationResponse,
   TTabValue,
   TThunkOrderResponse,
   TThunkStatus
} from "../../utils/types";
import { BASE_URL } from "../../utils/api";
import { ORDERS_ALL } from "../../utils/variables";
import JSZip from "jszip";
import createBlob from "../../utils/helpers/createBlob";
import { saveAs } from 'file-saver';


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
      } catch ( err: any ) {
         return rejectWithValue( err.response?.data.message )
      }
   }
)

export const thunkDownloadFiles = createAsyncThunk<void, TOrderResponse>(
   'tableOrders/thunkDownloadFiles',
   async ( row, { rejectWithValue } ) => {
      try {
         const zip = new JSZip()
         const images = row.images && JSON.parse( row.images )
         images.forEach( ( fileName: string ) => {
            const file = createBlob( `http://localhost:8080/${ fileName }`, fileName )
            zip.file( fileName, file )
         } )
         const content = await zip.generateAsync( { type: 'blob' } )
         saveAs( content, `${ row.id }` )
      } catch ( err: any ) {
         return rejectWithValue( err.response?.data.message )
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
   search: string
   status: TThunkStatus
   error: string,
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
   search: '',
   status: null,
   error: '',
}

const tableOrdersSlice = createSlice( {
   name: 'tableOrders',
   initialState,
   reducers: {
      setSortStatus( state, action ) {
         state.sortStatus = action.payload
      },
      setCurrentPagination( state, action ) {
         state.pagination.current = action.payload
      },
      setSearch( state, action ) {
         state.search = action.payload
      },
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

         state.orders = state.orders.map( ( order: any ) => {
            if ( order.changed !== undefined && order.id === row.id ) order.changed = false
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
            state.error = ''
         } )
         .addCase( thunkGetOrders.fulfilled, ( state, action ) => {
            const { orders, pagination, count, sortStatus } = action.payload
            state.orders = orders
            state.count = count
            state.pagination = pagination
            state.sortStatus = sortStatus
            state.status = 'success'
            state.error = ''
         } )
         .addCase( thunkGetOrders.rejected, ( state, action ) => {
            state.status = 'error'
            state.error = action.payload as string
         } )

      builder
         .addCase( thunkDownloadFiles.pending, ( state ) => {
            state.status = 'loading'
            state.error = ''
         } )
         .addCase( thunkDownloadFiles.fulfilled, ( state ) => {
            state.status = 'success'
            state.error = ''
         } )
         .addCase( thunkDownloadFiles.rejected, ( state, action ) => {
            state.status = 'error'
            state.error = action.payload as string
         } )
   }
} )


export const {
   setSortStatus,
   setCurrentPagination,
   setSearch,
   setCurrentTab,
   setCellOrders,
   selectOrders,
   changedOff,
} = tableOrdersSlice.actions
export default tableOrdersSlice.reducer


