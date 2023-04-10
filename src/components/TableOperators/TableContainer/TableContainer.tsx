import s from './TableContainer.module.scss'
import { Pagination } from "@megafon/ui-core";
import TableUtils from "../TableUtils";
import TableOperators from "../TableOperators";
import getQuery from "../../../utils/helpers/getQuery";
import { thunkGetOperators } from "../../../redux/slices/tableOperatorsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";


function TableContainer() {
   const dispatch = useAppDispatch()
   const { pagination, currentTab } = useAppSelector( state => ({
      pagination: state.tableOperators.pagination,
      currentTab: state.tableOperators.tab.value,
   }) )


   function onChange( index: number ) {
      dispatch( thunkGetOperators( {
         method: "GET",
         query: getQuery( { pagination: index, currentTab } )
      } ) )
   }


   return (
      <div className={ s.TableContainer }>

         <h2 className={ s.TableContainer__title }>
            Операторы
         </h2>

         <TableUtils/>

         <TableOperators/>

         <div className={ s.pagination_box }>
            <Pagination
               activePage={ pagination.current }
               totalPages={ pagination.total }
               onChange={ onChange }
            />
         </div>
      </div>
   )
}

export default TableContainer