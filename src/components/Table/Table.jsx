import s from "./Table.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTable } from "react-table";
import Checkbox from "../../components-ui/Checkbox/Checkbox.jsx";
import CellInput from "../../components/CellInput/CellInput.jsx";
import CellSelect from "../../components/CellSelect/CellSelect.jsx";
import TableRow from "../../components/Table/TableRow.jsx";
import { Tooltip } from "@megafon/ui-core";

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
   const col1Ref = useRef( null )
   const col2Ref = useRef( null )
   const col4Ref = useRef( null )
   const col5Ref = useRef( null )
   const col6Ref = useRef( null )
   const col7Ref = useRef( null )
   const col8Ref = useRef( null )
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
         tooltip: 'tooltip col1',
         ref: col1Ref
      },
      {
         Header: 'MSISND',
         CellTitle: 'MSISND',
         accessor: 'col2',
         tooltip: 'tooltip col2',
         ref: col2Ref
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
         ref: col4Ref
      },
      {
         Header: 'Что переносим',
         CellTitle: 'Услуга',
         options: [ 1, 2, 3 ],
         accessor: 'col5',
         tooltip: 'tooltip test',
         ref: col5Ref
      },
      {
         Header: 'Ответственный',
         CellTitle: 'ФИО',
         accessor: 'col6',
         tooltip: 'tooltip test',
         ref: col6Ref
      },
      {
         Header: 'Причина переноса',
         CellTitle: 'Причина',
         accessor: 'col7',
         tooltip: 'tooltip test',
         ref: col7Ref
      },
      {
         Header: 'Причина отказа',
         CellTitle: 'Причина',
         accessor: 'col8',
         tooltip: 'tooltip test',
         ref: col8Ref
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
               { headerGroup.headers.map( column => {
                     console.log( column )
                     return <div { ...column.getHeaderProps() } className={ s.Table__head_item }>
                        <span>{ column.render( 'Header' ) }</span>

                        { column.tooltip && <>
                           <div ref={ column.ref } className={ s.info_icon }/>
                           <Tooltip triggerElement={ column.ref }>
                              { column.tooltip }
                           </Tooltip>
                        </> }

                     </div>
                  }
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