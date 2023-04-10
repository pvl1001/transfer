import s from "./TableContainer/TableContainer.module.scss";
import TabsBox from "../TabsBox/TabsBox";
import { Search } from "@megafon/ui-core";
import ButtonAddOperator from "./ButtonAddOperator";
import { TTab } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setTab, thunkGetOperators } from "../../redux/slices/tableOperatorsSlice";
import getQuery from "../../utils/helpers/getQuery";



const TableUtils = () => {
   const dispatch = useAppDispatch()
   const { count, tab, pagination } = useAppSelector( state => state.tableOperators )
   const tabs: TTab[] = [
      {
         title: 'Все',
         count: count.all,
         value: "operatorsAll"
      },
      {
         title: 'Недавно добавленные',
         count: count.new,
         value: "operatorsNew"
      },
   ]

   const handleTabClick = ( index: number ) => {
      dispatch( setTab( { index, value: tabs[index].value } ) )
      dispatch( thunkGetOperators( {
         method: "GET",
         query: getQuery( {
            pagination: pagination.current,
            currentTab: tabs[index].value
         } )
      } ) )
   }

   return (
      <div className={ s.TableContainer__utils }>

         <TabsBox
            tabs={ tabs }
            defaultIndex={ tab.index }
            onTabClick={ handleTabClick }
         />

         <Search
            className={ s.TableContainer__search }
            placeholder="Поиск"
            searchId="1"
            classes={ { control: s.TableContainer__search } }
         />

         <ButtonAddOperator/>
      </div>
   )
}


export default TableUtils;