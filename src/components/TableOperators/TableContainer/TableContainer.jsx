import s from './TableContainer.module.scss'
import { Pagination } from "@megafon/ui-core";
import { useState } from "react";
import PaginationBox from "../../PaginationBox";
import TableUtils from "../TableUtils";
import TableOperators from "../TableOperators";


function TableContainer() {
   const [ currentIndex, setCurrentIndex ] = useState( 1 )
   const handleTabClick = ( index ) => {
      setCurrentIndex( index + 1 )

      console.log( index )
   }


   return (
      <div className={ s.TableContainer }>

         <h2 className={ s.TableContainer__title }>
            Операторы
         </h2>

         <TableUtils handleTabClick={ handleTabClick }/>

         <TableOperators/>

         <PaginationBox totalPages={ 12 } activePage={ 1 } className={ s.pagination_box }>
            { ( { totalPages, activePage, onChange } ) =>
               <Pagination
                  totalPages={ totalPages }
                  activePage={ activePage }
                  onChange={ onChange }
               />
            }
         </PaginationBox>
      </div>
   )
}

export default TableContainer