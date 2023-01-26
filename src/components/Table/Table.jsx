import s from "./Table.module.scss";
import { useCallback, useEffect, useState } from "react";
import { useTable } from "react-table";
import Checkbox from "@/components-ui/Checkbox/Checkbox.jsx";
import CellInput from "@/components/CellInput/CellInput.jsx";
import CellSelect from "@/components/CellSelect/CellSelect.jsx";
import TableRow from "@/components/Table/TableRow.jsx";


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
   const onBlur = useCallback(() => {
      updateMyData( index, id, inputValue )
   }, [index, id, inputValue])

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
   const [ data, setData ] = useState( () => [
      {
         col1: 'Hellodfdsfsdfsr34234',
         col2: 'World',
         col3: 'World',
         col4: 'World',
         col5: 'World',
         col6: 'World',
         col7: 'World',
         col8: 'World',
      },
      {
         col1: 'Hello',
         col2: 'World',
         col3: 'World',
         col4: 'World',
         col5: 'World',
         col6: 'World',
         col7: 'World',
         col8: 'World',
      },
   ] )
   const [ columns ] = useState( () => [
      {
         Header: 'Номер заявки',
         CellTitle: 'Номер CCMP',
         accessor: 'col1', // accessor is the "key" in the data
      },
      {
         Header: 'MSISND',
         CellTitle: 'MSISND',
         accessor: 'col2',
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
      },
      {
         Header: 'Что переносим',
         CellTitle: 'Услуга',
         options: [ 1, 2, 3 ],
         accessor: 'col5',
      },
      {
         Header: 'Ответственный',
         CellTitle: 'ФИО',
         accessor: 'col6',
      },
      {
         Header: 'Причина переноса',
         CellTitle: 'Причина',
         accessor: 'col7',
      },
      {
         Header: 'Причина отказа',
         CellTitle: 'Причина',
         accessor: 'col8',
      },
   ] )
   const [ skipPageReset, setSkipPageReset ] = useState( false )
   const {
      headerGroups,
      rows,
      prepareRow,
   } = useTable( { columns, data, defaultColumn, autoResetPage: !skipPageReset, updateMyData } )


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
               <div><Checkbox/></div>
               { headerGroup.headers.map( column =>
                  <div { ...column.getHeaderProps() }>{ column.render( 'Header' ) }</div>
               ) }
               <div/>
            </div>
         ) }

         { rows.map( row => {
            prepareRow( row )
            return <TableRow { ...row.getRowProps() } row={ row }/>
         } ) }

      </div>
   )
}

export default Table