// @ts-nocheck
import { FC, useRef } from "react"
import s_table from "./Table.module.scss"
import { Tooltip } from "@megafon/ui-core"
import { Column } from "react-table";
import { ReactComponent as SortArrowIcon } from '@megafon/ui-icons/system-16-arrow-list_up_16.svg'
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { thunkGetOrders } from "../../redux/slices/tableOrdersSlice";
import getQuery from "../../utils/helpers/getQuery";


type TTableColumnProps = {
   column: Column
}


const TableColumn: FC<TTableColumnProps> = ( { column } ) => {
   const dispatch = useAppDispatch()
   const { pagination, currentTab, sortStatus } = useAppSelector( state => ({
      pagination: state.tableOrders.pagination.current,
      currentTab: state.tableOrders.currentTab,
      sortStatus: state.tableOrders.sortStatus,
   }) )
   const ref = useRef( null )

   // сортировка по колонке "Время внесения"
   function sort() {
      dispatch( thunkGetOrders( {
         method: "GET",
         query: getQuery({
            sortStatus: sortStatus === 'DESC' ? 'ASC' : 'DESC',
            pagination,
            currentTab,
         })
      } ) )
   }

   return (
      <div { ...column.getHeaderProps() } className={ s_table.Table__head_item }>
         <span>{ column.render( 'Header' ) }</span>

         { column.tooltip && <>
            <div ref={ ref } className={ s_table.info_icon }/>
            <Tooltip triggerElement={ ref }>
               { column.tooltip }
            </Tooltip>
         </> }

         { column.sort &&
            <div className={ s_table.icon_sort } onClick={ sort }>
               <SortArrowIcon/>
               <SortArrowIcon/>
            </div> }
      </div>
   )
}

export default TableColumn