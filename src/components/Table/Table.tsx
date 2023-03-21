// @ts-nocheck
import s from "./Table.module.scss";
import { useEffect, useState } from "react";
import { useTable, useRowSelect } from "react-table";
import TableRow from "../../components/Table/TableRow";
import TableColumn from "./TableColumn";
import DeletePanel from "../DeletePanel/DeletePanel";
import checkboxToggleHandler from "../../utils/helpers/checkboxToggleHandler";
import { fetchGetOrders, setTableOrders } from "../../redux/slices/tableOrdersSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import defaultColumn from "./EditableCell";


function Table() {
   const dispatch = useAppDispatch()
   const data = useAppSelector( state => state.tableOrders.orders )
   const [ isVisibleDeletePanel, setIsVisibleDeletePanel ] = useState( false )

   const [ columns ] = useState( () => [
      {
         Header: 'Номер заявки',
         CellTitle: 'Номер CCMP',
         accessor: '_id', // accessor is the "key" in the data
         tooltip: 'tooltip _id',
      },
      {
         Header: 'MSISND',
         CellTitle: 'MSISND',
         accessor: 'msisnd',
         tooltip: 'tooltip msisnd',
      },
      {
         Header: 'Время внесения',
         CellTitle: 'Дата и время',
         accessor: 'date',
      },
      {
         Header: 'Согласование',
         CellTitle: 'Статус',
         options: [ 'Согласовано', 'Не согласовано' ],
         accessor: 'status',
         tooltip: 'tooltip test',
      },
      {
         Header: 'Что переносим',
         CellTitle: 'Услуга',
         options: [ 1, 2, 3 ],
         accessor: 'service',
         tooltip: 'tooltip test',
      },
      {
         Header: 'Ответственный',
         CellTitle: 'ФИО',
         accessor: 'name',
         tooltip: 'tooltip test',
      },
      {
         Header: 'Причина переноса',
         CellTitle: 'Причина',
         accessor: 'reason_transfer',
         tooltip: 'tooltip test',
      },
      {
         Header: 'Причина отказа',
         CellTitle: 'Причина',
         accessor: 'reason_rejection',
         tooltip: 'tooltip test',
      },
   ] )
   const [ skipPageReset, setSkipPageReset ] = useState( false )
   const {
      getTableProps,
      headerGroups,
      rows,
      prepareRow,
      selectedFlatRows,
      getTableBodyProps,
      state: { selectedRowIds },
   } = useTable( { columns, data, defaultColumn, autoResetPage: !skipPageReset, updateMyData },
      useRowSelect,
      hooks => checkboxToggleHandler( hooks, setIsVisibleDeletePanel )
   )

   useEffect( () => {
      if ( !data.length ) dispatch( fetchGetOrders() )
   }, [] )

   // Изменить данные таблицы
   function updateMyData( rowIndex, columnId, value ) {
      // Включаем флаг, чтобы не сбрасывать страницу
      setSkipPageReset( true )
      dispatch( setTableOrders( { rowIndex, columnId, value } ) )
   }

   useEffect( () => {
      setSkipPageReset( false )
   }, [ data ] )


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
               return <TableRow key={ key } role={ role } row={ row } index={ i }/>
            } ) }
         </div>

         {/*<pre>*/ }
         {/*  <code>*/ }
         {/*    { JSON.stringify(*/ }
         {/*       {*/ }
         {/*          selectedRowIds: selectedRowIds,*/ }
         {/*          'selectedFlatRows[].original': selectedFlatRows.map(*/ }
         {/*             d => d.original*/ }
         {/*          ),*/ }
         {/*       },*/ }
         {/*       null,*/ }
         {/*       2*/ }
         {/*    ) }*/ }
         {/*  </code>*/ }
         {/*</pre>*/ }
         {/*<pre>{ JSON.stringify( isVisibleDeletePanel ) }</pre>*/ }

         { !!selectedFlatRows.length && isVisibleDeletePanel &&
            <DeletePanel setIsVisibleDeletePanel={ setIsVisibleDeletePanel }/> }
      </div>
   )
}

export default Table