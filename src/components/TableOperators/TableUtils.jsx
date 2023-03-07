import React from 'react';
import s from "./TableContainer/TableContainer.module.scss";
import TabsBox from "../../components-ui/Tabs/TabsBox";
import { Button, Search } from "@megafon/ui-core";
import useModal from "../../hooks/useModal";


const tabs = [
   {
      title: 'Все',
      count: 165,
   },
   {
      title: 'Недавно добавленные',
      count: 120,
   },
]


function TableUtils( { handleTabClick } ) {
   const { showModal } = useModal()

   return (
      <div className={ s.TableContainer__utils }>

         <TabsBox tabs={ tabs } onTabClick={ handleTabClick }/>

         <Search
            className={ s.TableContainer__search }
            placeholder="Поиск"
            searchId="1"
            classes={ { control: s.TableContainer__search } }
         />

         <Button theme={ 'green' } onClick={ showModal }>
            + Добавить оператора
         </Button>
      </div>
   );
}

export default TableUtils;