import { useAppSelector } from "../redux/store";


const UseQuery = ( tableKey: 'tableOrders' | 'tableOperators' ) => {

   const {
      pagination,
      currentTab,
      sortStatus = '',
      search = '',
   } = useAppSelector( state => ({
      pagination: state[tableKey].pagination.current,
      currentTab: state[tableKey].tab.value,
      sortStatus: state.tableOrders.sortStatus,
      search: state[tableKey].search,
   }) )

   return `?pagination=${ pagination }&tab=${ currentTab }&search=${ search }` + (sortStatus
      ? `&sort=${ sortStatus }`
      : '')

}

export default UseQuery;