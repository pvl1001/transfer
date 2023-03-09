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
            CellTitle={ CellTitle }
            options={ options }
            onBlur={ onBlur }
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
   const [ data, setData ] = useState( () => Array( 5 ).fill( {
      col1: 'Hellodfdsfsdfsr34234',
      col2: 'World',
      col3: 'World',
      col4: 'World',
      col5: 'World',
      col6: 'World',
      col7: 'World',
      col8: 'World',
   } ) )
   const [ columns ] = useState( () => [
      {
         Header: 'Номер заявки',
         CellTitle: 'Номер CCMP',
         accessor: 'col1', // accessor is the "key" in the data
         tooltip: 'tooltip col1',
      },
      {
         Header: 'MSISND',
         CellTitle: 'MSISND',
         accessor: 'col2',
         tooltip: 'tooltip col2',
      },
      {
         Header: 'Время внесения',
         CellTitle: 'Дата и время',
         accessor: 'col3',
      },
      {
         Header: 'Согласование',
         CellTitle: 'Статус',
         options: [ 'Согласовано', 'Не согласовано' ],
         accessor: 'col4',
         tooltip: 'tooltip test',
      },
      {
         Header: 'Что переносим',
         CellTitle: 'Услуга',
         options: [ 1, 2, 3 ],
         accessor: 'col5',
         tooltip: 'tooltip test',
      },
      {
         Header: 'Ответственный',
         CellTitle: 'ФИО',
         accessor: 'col6',
         tooltip: 'tooltip test',
      },
      {
         Header: 'Причина переноса',
         CellTitle: 'Причина',
         accessor: 'col7',
         tooltip: 'tooltip test',
      },
      {
         Header: 'Причина отказа',
         CellTitle: 'Причина',
         accessor: 'col8',
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