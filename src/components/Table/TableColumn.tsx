// @ts-nocheck
import { FC, useRef } from "react"
import s_table from "./Table.module.scss"
import { Tooltip } from "@megafon/ui-core"
import { Column } from "react-table";


type TTableColumnProps = {
   column: Column
}


const TableColumn: FC<TTableColumnProps> = ( { column } ) => {
   const ref = useRef( null )

   return (
      <div { ...column.getHeaderProps() } className={ s_table.Table__head_item }>
         <span>{ column.render( 'Header' ) }</span>

         { column.tooltip && <>
            <div ref={ ref } className={ s_table.info_icon }/>
            <Tooltip triggerElement={ ref }>
               { column.tooltip }
            </Tooltip>
         </> }
      </div>
   )
}

export default TableColumn