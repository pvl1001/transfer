import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { TOperator, TThunkStatus } from "../../utils/types";
import { BASE_URL } from "../../utils/api";


export const thunkGetOperators = createAsyncThunk<TOperator[]>(
   'tableOperators/thunkGetOperators',
   async ( _, { rejectWithValue } ) => {
      try {
         const { data, status } = await axios.get( `${ BASE_URL }/operators` )
         if ( status === 200 ) return data
         throw new Error( 'Ошибка ' + status )
      } catch ( err ) {
         rejectWithValue( err )
         console.error( err )
      }
   }
)


export const thunkDeleteOperators = createAsyncThunk<TOperator[], number[]>(
   'tableOperators/thunkDeleteOperators',
   async ( selectedId, { rejectWithValue } ) => {
      try {
         const { data, status } = await axios.delete( `${ BASE_URL }/operators`, { data: selectedId } )
         if ( status === 200 ) return data
         throw new Error( 'Ошибка удаления заявки. Код: ' + status )
      } catch ( err ) {
         rejectWithValue( err )
         console.error( err )
      }
   }
)

export const thunkAddOperator = createAsyncThunk<TOperator, TOperator>(
   'tableOperators/thunkAddOperator',
   async ( orderForm, { rejectWithValue } ) => {
      try {
         const { status, data } = await axios.post( `${ BASE_URL }/operators`, orderForm )
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
   selectedId: number[]
   status: TThunkStatus
}


const initialState: TTableOperatorsState = {
   operators: [],
   selectedId: [],
   status: null,
}

const tableOperatorsSlice = createSlice( {
   name: 'tableOperators',
   initialState,
   reducers: {
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
         .addCase( thunkAddOperator.pending, ( state ) => {
            state.status = 'loading'
         } )
         .addCase( thunkAddOperator.fulfilled, ( state, action ) => {
            state.operators.unshift( action.payload )
            state.status = 'success'
         } )
         .addCase( thunkAddOperator.rejected, ( state ) => {
            state.operators = []
            state.status = 'error'
         } )

      builder
         .addCase( thunkDeleteOperators.pending, ( state ) => {
            state.status = 'loading'
         } )
         .addCase( thunkDeleteOperators.fulfilled, ( state, action ) => {
            state.operators = action.payload
            state.status = 'success'
         } )
         .addCase( thunkDeleteOperators.rejected, ( state ) => {
            state.operators = []
            state.status = 'error'
         } )

      builder
         .addCase( thunkGetOperators.pending, ( state ) => {
            state.status = 'loading'
         } )
         .addCase( thunkGetOperators.fulfilled, ( state, action ) => {
            state.operators = action.payload
            state.status = 'success'
         } )
         .addCase( thunkGetOperators.rejected, ( state ) => {
            state.operators = []
            state.status = 'error'
         } )
   }
} )


export const { setCellOperators, addOperators, selectOperators, changedOff } = tableOperatorsSlice.actions
export default tableOperatorsSlice.reducer


