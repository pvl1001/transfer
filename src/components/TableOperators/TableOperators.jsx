import React, { useCallback, useEffect, useState } from "react";
import CellSelect from "../CellSelect/CellSelect";
import CellInput from "../CellInput/CellInput";
import { useRowSelect, useTable } from "react-table";
import s from "./TableOperatos.module.scss";
import TableColumn from "../Table/TableColumn";
import TableRow from "./TableRow";
import { CheckboxToggleHandler } from "../../utils/helpers/checkboxToggleHandler";
import DeletePanel from "../DeletePanel/DeletePanel";

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

function TableOperators() {
   const [ isVisibleDeletePanel, setIsVisibleDeletePanel ] = useState( false )
   const [ data, setData ] = useState( () => [
      {
         col1: 'Hellodfdsfsdfsr34234',
         col2: 'World',
         col3: 'World',
         col4: 'World',
         col5: 'World',
         col6: 'World',
         col7: 'World',
      },
      {
         col1: 'Hello',
         col2: 'World',
         col3: 'World',
         col4: 'World',
         col5: 'World',
         col6: 'World',
         col7: 'World',
      },
      {
         col1: 'Hello',
         col2: 'World',
         col3: 'World',
         col4: 'World',
         col5: 'World',
         col6: 'World',
         col7: 'World',
      },
   ] )
   const [ columns ] = useState( () => [
      {
         Header: 'ФИО',
         CellTitle: 'ФИО',
         accessor: 'col1', // accessor is the "key" in the data
      },
      {
         Header: 'Компания',
         CellTitle: 'Компания',
         accessor: 'col2',
      },
      {
         Header: 'Отдел',
         CellTitle: 'Отдел',
         accessor: 'col3',
      },
      {
         Header: 'Роль',
         CellTitle: 'Роль',
         accessor: 'col4',
      },
      {
         Header: 'Руководитель',
         CellTitle: 'Руководитель',
         accessor: 'col5',
      },
      {
         Header: 'Телефон',
         CellTitle: 'Телефон',
         accessor: 'col6',
      },
      {
         Header: 'Почта',
         CellTitle: 'Почта',
         accessor: 'col7',
      },
   ] )

   const [ skipPageReset, setSkipPageReset ] = useState( false )
   const {
      headerGroups,
      rows,
      prepareRow,
      selectedFlatRows,
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
      <div className={ s.Table }>
         { headerGroups.map( headerGroup =>
            <div className={ s.Table__head } { ...headerGroup.getHeaderGroupProps() }>
               { headerGroup.headers.map( column =>
                  <TableColumn key={ column.render( 'Header' ) } column={ column }/>
               ) }
            </div>
         ) }

         { rows.map( row => {
            prepareRow( row )
            return <TableRow { ...row.getRowProps() } row={ row }/>
         } ) }

         { !!selectedFlatRows.length && isVisibleDeletePanel &&
            <DeletePanel setIsVisibleDeletePanel={ setIsVisibleDeletePanel }/> }
      </div>
   )
}

export default TableOperators