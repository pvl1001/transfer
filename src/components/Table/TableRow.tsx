import { FC, useState } from 'react'
import s from "../../components/Table/Table.module.scss"
import { Collapse } from "@mui/material"
import HelpMassage from "../../components/HelpMessage/HelpMassage";
import TableMatching from "./TableMatching/TableMatching";
import { Button } from "@megafon/ui-core";
import { thunkGetOrders } from "../../redux/slices/tableOrdersSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import getQuery from "../../utils/helpers/getQuery";
import useAlert from "../../hooks/useAlert";


const TableRow: FC<any> = ( { row, updateMyData } ) => {
   const dispatch = useAppDispatch()
   const { alertSuccess } = useAlert()
   const { pagination, currentTab, sortStatus } = useAppSelector( state => ({
      pagination: state.tableOrders.pagination.current,
      currentTab: state.tableOrders.tab.value,
      sortStatus: state.tableOrders.sortStatus,
   }) )
   const [ collapse, setCollapse ] = useState( false )
   const toggleBtnStyle = collapse ? { transform: 'rotate(180deg)' } : {}

   function collapseHandler() {
      setCollapse( prev => !prev )
   }

   async function saveData() {
      const res = await dispatch<any>( thunkGetOrders( {
         method: "PUT",
         query: getQuery( { pagination, currentTab, sortStatus } ),
         payload: { row: row.original, pagination, tab: currentTab }
      } ) )

      console.log(row.original)
      if ( !res.error ) alertSuccess( 'Данные сохранены!' )
   }


   return (
      <div className={ `${ s.Table__row } ${ row.isSelected ? s.checked : '' }` }>
         <div className={ s.Table__row_main }>

            {/*@ts-ignore*/ }
            { row.cells.map( cell => {
                  const { key, role } = cell.getCellProps()
                  return <div key={ key } role={ role }>{ cell.render( 'Cell' ) }</div>
               }
            ) }
            <div>
               <button className={ s.Table__collapse_btn } onClick={ collapseHandler }>
                  <div className={ s.Table__arrow_icon } style={ toggleBtnStyle }/>
               </button>
            </div>
         </div>

         <Collapse in={ collapse }>
            <div className={ s.Table__row_table }>

               <TableMatching row={ row } updateMyData={ updateMyData }/>

               <div className={ s.Table__help_message }>
                  <HelpMassage theme={ 'done' }>
                     Заявка еще не согласована. Вам необходимо согласовать её до 5 января 2023 года.
                  </HelpMassage>

                  <HelpMassage theme={ 'warning' }>
                     Вносить правки в данную заявку можно до 28 февраля 2023 года включительно
                  </HelpMassage>
               </div>

               <div className={ s.Table__btns }>
                  {/* @ts-ignore */ }
                  <Button theme="black" type="outline">Согласовать</Button>
                  {/* @ts-ignore */ }
                  <Button theme="black" type="outline" className={ s.red_btn }>Отказать в переносе</Button>
                  {/* @ts-ignore */ }
                  <Button disabled={ !row.original.changed } onClick={ saveData }>Сохранить данные</Button>
               </div>
            </div>
         </Collapse>
      </div>
   )
}


export default TableRow