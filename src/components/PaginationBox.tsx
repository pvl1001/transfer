import { useEffect, useState } from "react";
import { TPagination, TPaginationBoxProps } from "../utils/types";
import { thunkGetOrders } from "../redux/slices/tableOrdersSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import getQuery from "../utils/helpers/getQuery";


const PaginationBox = (
   { totalPages, activePage, children, className = '' }: TPaginationBoxProps ) => {
   const dispatch = useAppDispatch()
   const { currentTab, sortStatus } = useAppSelector( state => ({
      currentTab: state.tableOrders.tab.value,
      sortStatus: state.tableOrders.sortStatus,
   }) )
   const [ currentActivePage, setCurrentActivePage ] = useState( activePage )

   useEffect( () => {
      setCurrentActivePage( activePage )
   }, [ activePage ] )

   const childrenProps: TPagination = {
      totalPages,
      activePage: currentActivePage,
      onChange: ( pagination ) => {
         setCurrentActivePage( pagination )
         dispatch( thunkGetOrders( {
            method: "GET",
            query: getQuery( { pagination, currentTab, sortStatus } )
         } ) )
      },
   }

   return <div className={ className }>{ children( childrenProps ) }</div>
}


export default PaginationBox