import s from './TableContainer.module.scss'
import { Pagination } from "@megafon/ui-core";
import TableUtils from "../TableUtils";
import TableOperators from "../TableOperators";
import { setCurrentPagination } from "../../../redux/slices/tableOperatorsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";


function TableContainer() {
   const dispatch = useAppDispatch()
   const { pagination } = useAppSelector( state => ({
      pagination: state.tableOperators.pagination,
   }) )

   function onChange( index: number ) {
      dispatch( setCurrentPagination( index ) )
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