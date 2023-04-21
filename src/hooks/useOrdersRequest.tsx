import { thunkGetOrders } from "../redux/slices/tableOrdersSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import changeAttr from "../utils/helpers/changeAttr";
import { Row } from "react-table";
import { TOrderExel } from "../utils/types";


function deleteDuplicate<T>( arr: T[] ): string[] {
   const arrToJson = arr.map( el => JSON.stringify( el ) )
   return [ ...new Set( arrToJson ) ].map( el => JSON.parse( el ) )
}


function UseOrdersRequest() {
   const dispatch = useAppDispatch()
   const {
      id,
      pagination,
      tab,
      search,
      sortStatus,
   } = useAppSelector( state => ({
      pagination: state.tableOrders.pagination.current,
      id: state.tableOrders.selectedId,
      tab: state.tableOrders.tab.value,
      search: state.tableOrders.search,
      sortStatus: state.tableOrders.sortStatus,
   }) )

   return {
      getOrders: ( query: string ) => dispatch( thunkGetOrders( {
         method: 'GET',
         query
      } ) ),
      createOrder: ( formData: FormData ) => dispatch( thunkGetOrders( {
         method: 'POST',
         payload: formData
      } ) ),
      updateOrder: ( row: Row ) => dispatch<any>( thunkGetOrders( {
         method: 'PUT',
         payload: {
            row: row.original,
            pagination,
            tab,
            search
         }
      } ) ),
      uploadOrders: ( orders: TOrderExel[] ) => dispatch( thunkGetOrders( {
         method: 'POST',
         query: '/xlsx',
         payload: changeAttr( deleteDuplicate( orders ) )
      } ) ),
      deleteOrders: () => dispatch( thunkGetOrders( {
         method: 'DELETE',
         payload: {
            id,
            tab,
            pagination,
            search
         }
      } ) )

   }
}

export default UseOrdersRequest;