import { thunkGetOperators } from "../redux/slices/tableOperatorsSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

function UseOperatorsRequest() {
   const dispatch = useAppDispatch()
   const {
      data,
      selectId,
      pagination,
      tab,
      search,
   } = useAppSelector( state => ({
      data: state.tableOperators.operators,
      selectId: state.tableOperators.selectedId,
      pagination: state.tableOperators.pagination.current,
      tab: state.tableOperators.tab.value,
      search: state.tableOperators.search,
   }) )

   return {
      getOperators: ( query: string ) => dispatch( thunkGetOperators( {
         method: 'GET',
         query
      } ) ),
      createOperator: ( data: any ) => dispatch<any>( thunkGetOperators( {
         method: 'POST',
         payload: {
            tab,
            row: {
               ...data,
               supervisor: 'Руководитель',
               phone: '+70000000000',
               email: 'test@megafon.ru',
            }
         }
      } ) ),
      updateOperator: ( rowIndexChanged: number ) => dispatch( thunkGetOperators( {
         method: 'PUT',
         payload: {
            row: data[rowIndexChanged],
            pagination,
            tab,
            search
         }
      } ) ),
      deleteOperators: () => dispatch( thunkGetOperators( {
         method: 'DELETE',
         payload: {
            id: selectId,
            pagination,
            tab,
            search
         }
      } ) ),
   }
}

export default UseOperatorsRequest;