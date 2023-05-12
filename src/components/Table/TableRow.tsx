import { FC, useState } from 'react'
import s from "../../components/Table/Table.module.scss"
import { Collapse } from "@mui/material"
import HelpMassage from "../../components/HelpMessage/HelpMassage";
import TableMatching from "./TableMatching/TableMatching";
import { Button } from "@megafon/ui-core";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import useAlert from "../../hooks/useAlert";
import useOrdersRequest from "../../hooks/useOrdersRequest";


const TableRow: FC<any> = ( { row, updateMyData } ) => {
   const dispatch = useAppDispatch()
   const { user } = useAppSelector( state => state.auth )
   const { updateOrder } = useOrdersRequest()
   const { alertSuccess } = useAlert()
   const [ collapse, setCollapse ] = useState( false )
   const toggleBtnStyle = collapse ? { transform: 'rotate(-180deg)' } : {}

   function collapseHandler(): void {
      setCollapse( prev => !prev )
   }

   async function saveData(): Promise<void> {
      const res = await updateOrder( row )
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
                  { user?.role === 'Администратор' && <Button theme="black" type="outline">Согласовать</Button> }
                  {/* @ts-ignore */ }
                  { user?.role !== 'Оператор' && <Button theme="black" type="outline" className={ s.red_btn }>Отказать в переносе</Button> }
                  {/* @ts-ignore */ }
                  <Button disabled={ !row.original.changed } onClick={ saveData }>Сохранить данные</Button>
               </div>
            </div>
         </Collapse>
      </div>
   )
}


export default TableRow