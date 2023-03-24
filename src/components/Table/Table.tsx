// @ts-nocheck
import s from "./Table.module.scss";
import { useEffect, useState } from "react";
import { useTable, useRowSelect } from "react-table";
import TableRow from "../../components/Table/TableRow";
import TableColumn from "./TableColumn";
import DeletePanel from "../DeletePanel/DeletePanel";
import checkboxToggleHandler from "../../utils/helpers/checkboxToggleHandler";
import { thunkGetOrders, selectOrders, setCellOrders } from "../../redux/slices/tableOrdersSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import defaultColumn from "./EditableCell";
import { orderColumns as columns } from "../../data/table";


function Table() {
   const dispatch = useAppDispatch()
   const data = useAppSelector( state => state.tableOrders.orders )
   const [ isVisibleDeletePanel, setIsVisibleDeletePanel ] = useState( false )

   const [ skipPageReset, setSkipPageReset ] = useState( false )
   const {
      getTableProps,
      headerGroups,
      rows,
      prepareRow,
      selectedFlatRows,
      getTableBodyProps,
   } = useTable( { columns, data, defaultColumn, autoResetPage: !skipPageReset, updateMyData },
      useRowSelect,
      hooks => checkboxToggleHandler( hooks, setIsVisibleDeletePanel )
   )

   useEffect( () => {
      if ( !data.length ) dispatch( thunkGetOrders() )
   }, [] )

   // Изменить данные таблицы
   function updateMyData( rowIndex, columnId, value ) {
      setSkipPageReset( true ) // Включаем флаг, чтобы не сбрасывать страницу
      dispatch( setCellOrders( { rowIndex, columnId, value } ) )
   }

   useEffect( () => {
      setSkipPageReset( false )
   }, [ data ] )

   useEffect( () => {
      dispatch( selectOrders( selectedFlatRows.map( d => d.original.id ) ) )
   }, [ selectedFlatRows ] )


   return (
      <div className={ s.Table } { ...getTableProps() }>

         { headerGroups.map( headerGroup => {
               const { key, role } = headerGroup.getHeaderGroupProps()
               return <div key={ key } role={ role } className={ s.Table__head }>
                  { headerGroup.headers.map( column =>
                     <TableColumn key={ column.render( 'Header' ) } column={ column }/>
                  ) }
                  <div/>
               </div>
            }
         ) }

         <div { ...getTableBodyProps() }>
            { rows.map( ( row, i ) => {
               prepareRow( row )
               const { key, role } = row.getRowProps()
               return <TableRow
                  key={ key }
                  role={ role }
                  row={ row }
                  index={ i }
                  updateMyData={ updateMyData }
               />
            } ) }
         </div>

         { !!selectedFlatRows.length && isVisibleDeletePanel &&
            <DeletePanel setIsVisibleDeletePanel={ setIsVisibleDeletePanel }/> }
      </div>
   )
}

export default Table