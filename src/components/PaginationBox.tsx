import { useEffect, useState } from "react";
import { TPagination, TPaginationBoxProps } from "../utils/types";
import { thunkGetOrders } from "../redux/slices/tableOrdersSlice";
import { useAppDispatch } from "../redux/store";


const PaginationBox = (
   { totalPages, activePage, children, className = '' }: TPaginationBoxProps ) => {
   const dispatch = useAppDispatch()
   const [ currentActivePage, setCurrentActivePage ] = useState( activePage )

   useEffect( () => {
      setCurrentActivePage( activePage )
   }, [ activePage ] )

   const childrenProps: TPagination = {
      totalPages,
      activePage: currentActivePage,
      onChange: ( value ) => {
         setCurrentActivePage( value )
         dispatch( thunkGetOrders( value ) )
      },
   }

   return <div className={ className }>{ children( childrenProps ) }</div>
}


export default PaginationBox