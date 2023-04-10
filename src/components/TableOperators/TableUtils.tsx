import s from "./TableContainer/TableContainer.module.scss";
import TabsBox from "../TabsBox/TabsBox";
import { Search } from "@megafon/ui-core";
import ButtonAddOperator from "./ButtonAddOperator";
import { TTab } from "../../utils/types";
import { FC } from "react";
import { useAppSelector } from "../../redux/store";


type TTableUtilsProps = {
   handleTabClick: ( index: number ) => void
}

const TableUtils: FC<TTableUtilsProps> = ( { handleTabClick } ) => {
   const { count, tab } = useAppSelector( state => state.tableOperators )
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

   return (
      <div className={ s.TableContainer__utils }>

         <TabsBox tabs={ tabs } defaultIndex={ tab.index } onTabClick={ handleTabClick }/>

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