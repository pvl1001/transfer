import { useAppSelector } from "../redux/store";


const UseQuery = ( tableKey: 'tableOrders' | 'tableOperators' ) => {

   const { pagination, currentTab, sortStatus, search } = useAppSelector( ( state: any ) => ({
      pagination: state[tableKey].pagination.current,
      currentTab: state[tableKey].tab.value,
      sortStatus: state[tableKey].sortStatus,
      search: state[tableKey].search,
   }) )

   return `?pagination=${ pagination }&tab=${ currentTab }&search=${ search }` + (sortStatus
      ? `&sort=${ sortStatus }`
      : '')

}

export default UseQuery;