import s from "./Table.module.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useTable, useRowSelect } from "react-table";
import CellInput from "../../components/CellInput/CellInput.jsx";
import CellSelect from "../../components/CellSelect/CellSelect.jsx";
import TableRow from "../../components/Table/TableRow.jsx";
import TableColumn from "./TableColumn";
import DeletePanel from "../DeletePanel/DeletePanel";
import { CheckboxToggleHandler } from "../../utils/helpers/checkboxToggleHandler";


function EditableCell( { value, row, column, updateMyData } ) {
   const initialValue = value
   const { index } = row
   const { id, CellTitle, options } = column
   const [ inputValue, setInputValue ] = useState( initialValue )

   // onChange CellInput
   function onChange( e ) {
      setInputValue( e.target.value )
   }

   // Обновить внешние данные
   const onBlur = useCallback( () => {
      updateMyData( index, id, inputValue )
   }, [ index, id, inputValue ] )

   // Обновить внешние данные Select
   const onChangeSelect = useCallback( ( value ) => {
      updateMyData( index, id, value )
   }, [ index, id, value ] )

   // Очистить поле input
   function onClear( e ) {
      e.preventDefault()
      setInputValue( '' )

   }

   // Если начальное значение изменено внешне, синхронизируйте его с нашим состоянием.
   useEffect( () => {
      setInputValue( initialValue )
   }, [ initialValue ] )


   return (
      options
         ? <CellSelect
            onChange={ onChangeSelect }
            value={ inputValue }
            CellTitle={ CellTitle }
            options={ options }
         />
         : <CellInput
            value={ inputValue }
            CellTitle={ CellTitle }
            onChange={ onChange }
            onBlur={ onBlur }
            onClear={ onClear }
            disabled={ CellTitle === 'Дата и время' }
         />
   )
}

// Установите наш редактируемый модуль визуализации ячеек в качестве средства визуализации ячеек по умолчанию.
const defaultColumn = {
   Cell: EditableCell,
}

function Table() {
   const [ isVisibleDeletePanel, setIsVisibleDeletePanel ] = useState( false )

   const [ data, setData ] = useState( [] )

   useEffect( () => {
      fetch( 'http://localhost:8080/api/orders' )
         .then( res => res.json() )
         .then( orders => {
            // debugger
            setData( orders.data )
         } )
   }, [] )

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
      hooks => CheckboxToggleHandler( hooks, setIsVisibleDeletePanel )
   )


   // Изменить данные таблицы
   function updateMyData( rowIndex, columnId, value ) {
      // Включаем флаг, чтобы не сбрасывать страницу
      setSkipPageReset( true )
      setData( old =>
         old.map( ( row, index ) => {
            if ( index === rowIndex ) {
               return {
                  ...old[rowIndex],
                  [columnId]: value,
               }
            }
            return row
         } )
      )
   }

   useEffect( () => {
      setSkipPageReset( false )
   }, [ data ] )


   return (
      <div className={ s.Table } { ...getTableProps() }>

         { headerGroups.map( headerGroup =>
            <div className={ s.Table__head } { ...headerGroup.getHeaderGroupProps() }>
               { headerGroup.headers.map( column =>
                  <TableColumn key={ column.render( 'Header' ) } column={ column }/>
               ) }
               <div/>
            </div>
         ) }

         <div { ...getTableBodyProps() }>
            { rows.map( ( row, i ) => {
               prepareRow( row )
               return <TableRow { ...row.getRowProps() } row={ row } index={ i }/>
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