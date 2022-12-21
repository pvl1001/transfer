import s from "./Table.module.scss";
import { useEffect, useState } from "react";
import { useTable } from "react-table";
import Checkbox from "@/components/Checkbox/Checkbox.jsx";
import CellInput from "@/components/CellInput/CellInput.jsx";


function EditableCell( props ) {
   const {
      value: initialValue,
      row: { index },
      column: { id },
      updateMyData, // Это пользовательская функция, которую мы предоставили экземпляру нашей таблицы
      // Нам нужно нормально сохранять и обновлять состояние ячейки
   } = props

   const [ value, setValue ] = useState( initialValue )

   function onChange( e ) {
      setValue( e.target.value )
   }

   // Обновить внешние данные
   function onBlur() {
      updateMyData( index, id, value )
   }

   // Очистить поле input
   function onClear( e ) {
      e.preventDefault()
      setValue( '' )
   }

   // Если начальное значение изменено внешне, синхронизируйте его с нашим состоянием.
   useEffect( () => {
      setValue( initialValue )
   }, [ initialValue ] )


   return (
      <CellInput
         value={ value }
         onChange={ onChange }
         onBlur={ onBlur }
         onClear={ onClear }
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
         accessor: 'col4',
      },
      {
         Header: 'Что переносим',
         CellTitle: 'Услуга',
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
      getTableProps,
      getTableBodyProps,
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
      <table className={ s.Table } { ...getTableProps() }>
         <thead>
         { headerGroups.map( headerGroup =>
            <tr { ...headerGroup.getHeaderGroupProps() }>
               <th><Checkbox/></th>
               { headerGroup.headers.map( column =>
                  <th { ...column.getHeaderProps() }>{ column.render( 'Header' ) }</th>
               ) }
               <th/>
            </tr>
         ) }
         </thead>

         <tbody { ...getTableBodyProps() }>
         { rows.map( ( row ) => {
            prepareRow( row )
            return (
               <tr { ...row.getRowProps() }>
                  <td><Checkbox/></td>
                  { row.cells.map( cell => {
                        return <td { ...cell.getCellProps() }>
                           <div className={ s.Table__cell }>
                              <h5 className={ s.Table__cell_title }>{ cell.column.CellTitle }</h5>
                              <div className={ s.Table__cell_value }>{ cell.render( 'Cell' ) }</div>
                           </div>
                        </td>
                     }
                  ) }
                  <td>
                     <button className={ s.Table__collapse_btn }>
                        <div className={ s.Table__arrow_icon }/>
                     </button>
                  </td>
               </tr>
            )
         } ) }
         </tbody>
      </table>

   )
}

export default Table