import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import {
   TOperator,
   TPaginationResponse,
   TTabValue,
   TThunkOperatorsResponse,
   TThunkStatus, TOperatorsCount
} from "../../utils/types";
import { BASE_URL } from "../../utils/api";
import { OPERATORS_ALL } from "../../utils/variables";


export const thunkGetOperators = createAsyncThunk<
   TThunkOperatorsResponse,
   any
>(
   'tableOperators/thunkGetOperators',
   async ( { method, payload, query = '' }, { rejectWithValue } ) => {
      try {
         const { data, status } = await axios( `${ BASE_URL }/operators${ query }`, {
            method,
            data: payload
         } )
         if ( status === 200 ) return data
         throw new Error( 'Ошибка ' + status )
      } catch ( err ) {
         rejectWithValue( err )
         console.error( err )
      }
   }
)


type TTableOperatorsState = {
   operators: TOperator[],
   count: TOperatorsCount,
   pagination: TPaginationResponse
   tab: { value: TTabValue, index: number },
   selectedId: number[]
   status: TThunkStatus
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
}

const tableOperatorsSlice = createSlice( {
   name: 'tableOperators',
   initialState,
   reducers: {
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
      changedOff( state, action ) {
         const row = action.payload

         state.operators = (state.operators).map( ( operator: any ) => {
            if ( operator.changed !== undefined ) {
               if ( operator.id === row.id ) operator.changed = false
            }
            return operator
         } )
      },
      addOperators( state, action ) {
         state.operators.push( action.payload )
      },
      selectOperators( state, action ) {
         state.selectedId = action.payload
      }
   },
   extraReducers: builder => {
      builder
         .addCase( thunkGetOperators.pending, ( state ) => {
            state.status = 'loading'
         } )
         .addCase( thunkGetOperators.fulfilled, ( state, action ) => {
            const { operators, pagination, count } = action.payload
            state.operators = operators
            state.count = count
            state.pagination = pagination
            state.status = 'success'
         } )
         .addCase( thunkGetOperators.rejected, ( state ) => {
            state.operators = []
            state.status = 'error'
         } )
   }
} )


export const { setCellOperators, addOperators, selectOperators, changedOff, setTab } = tableOperatorsSlice.actions
export default tableOperatorsSlice.reducer


