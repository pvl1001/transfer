import { useAppSelector } from "../redux/store";


const UseQuery = () => {

   const { pagination, currentTab, sortStatus, search } = useAppSelector( state => ({
      pagination: state.tableOrders.pagination.current,
      currentTab: state.tableOrders.tab.value,
      sortStatus: state.tableOrders.sortStatus,
      search: state.tableOrders.search,
   }) )

   return `?pagination=${ pagination }&tab=${ currentTab }&search=${ search }` + (sortStatus
      ? `&sort=${ sortStatus }`
      : '')

}

export default UseQuery;