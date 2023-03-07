import React, { useState } from 'react'
import s from "../../components/Table/Table.module.scss"
import { Collapse } from "@mui/material"
import HelpMassage from "../../components/HelpMessage/HelpMassage.jsx";
import TableMatching from "./TableMatching/TableMatching";
import { Button } from "@megafon/ui-core";


function TableRow( { row } ) {
   const [ collapse, setCollapse ] = useState( false )
   const toggleBtnStyle = collapse ? { transform: 'rotate(180deg)' } : {}

   function collapseHandler() {
      setCollapse( prev => !prev )
   }


   return (
      <div className={ `${ s.Table__row } ${ row.isSelected ? s.checked : '' }` }>
         <div className={ s.Table__row_main }>
            { row.cells.map( cell =>
               <div { ...cell.getCellProps() }>{ cell.render( 'Cell' ) }</div>
            ) }
            <div>
               <button className={ s.Table__collapse_btn } onClick={ collapseHandler }>
                  <div className={ s.Table__arrow_icon } style={ toggleBtnStyle }/>
               </button>
            </div>
         </div>

         <Collapse in={ collapse }>
            <div className={ s.Table__row_table }>

               <TableMatching/>

               <div className={ s.Table__help_message }>
                  <HelpMassage theme={ 'done' }>
                     Заявка еще не согласована. Вам необходимо согласовать её до 5 января 2023 года.
                  </HelpMassage>

                  <HelpMassage theme={ 'warning' }>
                     Вносить правки в данную заявку можно до 28 февраля 2023 года включительно
                  </HelpMassage>
               </div>

               <div className={ s.Table__btns }>
                  <Button theme="black" type="outline">Согласовать</Button>
                  <Button theme="black" type="outline" className={ s.red_btn }>Отказать в переносе</Button>
                  <Button disabled>Сохранить данные</Button>
               </div>
            </div>
         </Collapse>
      </div>
   )
}


export default TableRow