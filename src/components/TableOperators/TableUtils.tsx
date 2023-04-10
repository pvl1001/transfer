import s from "./TableContainer/TableContainer.module.scss";
import TabsBox from "../TabsBox/TabsBox";
import { Search } from "@megafon/ui-core";
import ButtonAddOperator from "./ButtonAddOperator";
import { TTab } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setTab, setSearch } from "../../redux/slices/tableOperatorsSlice";


const TableUtils = () => {
   const dispatch = useAppDispatch()
   const { count, tab, search } = useAppSelector( state => state.tableOperators )
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
   }

   function onSearch( value: string ) {
      dispatch( setSearch( value ) )
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
            searchId="search_operators"
            classes={ { control: s.TableContainer__search } }
            type="compact"
            value={ search }
            onChange={ onSearch }
         />

         <ButtonAddOperator/>
      </div>
   )
}


export default TableUtils;