import { useState } from "react";
import { TPagination, TPaginationBoxProps } from "../utils/types";


const PaginationBox = (
   { totalPages, activePage, children, className = ''  }: TPaginationBoxProps ) => {
   const [ currentActivePage, setCurrentActivePage ] = useState( activePage )

   const childrenProps: TPagination = {
      totalPages,
      activePage: currentActivePage,
      onChange: setCurrentActivePage,
   }

   return <div className={ className }>{ children( childrenProps ) }</div>
}


export default PaginationBox