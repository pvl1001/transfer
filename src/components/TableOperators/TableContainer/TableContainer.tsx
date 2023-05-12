import s from './TableContainer.module.scss'
import { Pagination } from "@megafon/ui-core";
import TableUtils from "../TableUtils";
import TableOperators from "../TableOperators";
import { setCurrentPagination } from "../../../redux/slices/tableOperatorsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import TableOverlay from "../../TableOverlay/TableOverlay";


function TableContainer() {
   const dispatch = useAppDispatch()
   const { pagination, operators, status } = useAppSelector( state => state.tableOperators )

   function onChange( index: number ) {
      dispatch( setCurrentPagination( index ) )
   }


   return (
      <div className={ s.TableContainer }>
         { status === 'loading' && <TableOverlay/> }

         <h2 className={ s.TableContainer__title }>
            Операторы
         </h2>

         <TableUtils/>

         { operators.length
            ? <>
               <TableOperators/>

               <div className={ s.pagination_box }>
                  <Pagination
                     activePage={ pagination.current }
                     totalPages={ pagination.total }
                     onChange={ onChange }
                  />
               </div>
            </>
            : <>Список пуст</>
         }

      </div>
   )
}

export default TableContainer