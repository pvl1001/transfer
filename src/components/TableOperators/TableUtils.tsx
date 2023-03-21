import s from "./TableContainer/TableContainer.module.scss";
import TabsBox from "../TabsBox/TabsBox";
import { Search } from "@megafon/ui-core";
import ButtonAddOperator from "./ButtonAddOperator";
import { TTab } from "../../utils/types";
import { FC } from "react";


const tabs: TTab[] = [
   {
      title: 'Все',
      count: 165,
   },
   {
      title: 'Недавно добавленные',
      count: 120,
   },
]


type TTableUtilsProps = {
   handleTabClick: ( index: number ) => void
}

const TableUtils: FC<TTableUtilsProps> = ( { handleTabClick } ) => {

   return (
      <div className={ s.TableContainer__utils }>

         <TabsBox tabs={ tabs } onTabClick={ handleTabClick }/>

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