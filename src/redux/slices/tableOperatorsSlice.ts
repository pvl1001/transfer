import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
   TOperator,
   TPaginationResponse,
   TTabValue,
   TThunkOperatorsResponse,
   TThunkStatus,
   TOperatorsCount
} from "../../utils/types";
import { request } from "../../utils/api";
import { OPERATORS_ALL } from "../../utils/variables";


export const thunkGetOperators = createAsyncThunk<
   TThunkOperatorsResponse,
   any
>(
   'tableOperators/thunkGetOperators',
   async ( { method, payload, query = '' }, { rejectWithValue } ) => {
      try {
         const { data, status } = await request( `operators${ query }`, {
            method,
            data: payload
         } )
         if ( status === 200 ) return data
         throw new Error( 'Ошибка ' + status )
      } catch ( err: any ) {
         return rejectWithValue( err.response?.data.message )
      }
   }
)


type TTableOperatorsState = {
   operators: TOperator[],
   count: TOperatorsCount,
   pagination: TPaginationResponse
   tab: { value: TTabValue, index: number },
   selectedId: number[]
   status: TThunkStatus,
   search: string,
   error: string,
}


const initialState: TTableOperatorsState = {
   operators: [],
   count: {
      all: 0,
      new: 0,
   },
   pagination: {
      current: 1,
      total: 0
   },
   tab: { value: OPERATORS_ALL, index: 0 },
   selectedId: [],
   status: null,
   search: '',
   error: '',
}

const tableOperatorsSlice = createSlice( {
   name: 'tableOperators',
   initialState,
   reducers: {
      setSearch( state, action ) {
         state.search = action.payload
      },
      setCurrentPagination( state, action ) {
         state.pagination.current = action.payload
      },
      setTab( state, action ) {
         state.tab = action.payload
      },
      setCellOperators( state, action ) {
         const { rowIndex, columnId, value } = action.payload

         state.operators = state.operators.map( ( row, index ) => {
            if ( index === rowIndex ) {
               return {
                  ...state.operators[rowIndex],
                  [columnId]: value,
                  changed: true
               }
            }
            return row
         } )
      },
      selectOperators( state, action ) {
         state.selectedId = action.payload
      }
   },
   extraReducers: builder => {
      builder
         .addCase( thunkGetOperators.pending, ( state ) => {
            state.status = 'loading'
            state.error = ''
         } )
         .addCase( thunkGetOperators.fulfilled, ( state, action ) => {
            const { operators, pagination, count } = action.payload
            state.operators = operators
            state.count = count
            state.pagination = pagination
            state.status = 'success'
            state.error = ''
         } )
         .addCase( thunkGetOperators.rejected, ( state, action ) => {
            state.status = 'error'
            state.error = action.payload as string
         } )
   }
} )


export const {
   setSearch,
   setCurrentPagination,
   setCellOperators,
   selectOperators,
   setTab
} = tableOperatorsSlice.actions
export default tableOperatorsSlice.reducer


