import s from "./TableMatching.module.scss";
import { useEffect, useState } from "react";
import { useTable } from "react-table";
import CellInput from "../../CellInput/CellInput.jsx";
import CellSelect from "../../CellSelect/CellSelect.jsx";
import TableColumn from "../TableColumn";
import { Counter } from "@megafon/ui-core";


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
   function onBlur() {
      updateMyData( index, id, inputValue )
   }

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

function TableMatching() {
   const [ data, setData ] = useState( () => [
      {
         number: 'Hellodfdsfsdfsr34234',
         prevSeller: 'World',
         nextSeller: 'World',
         contributed: 'World',
         name: 'World',
         double: 1,
         attachments: 'World',
      }
   ] )
   const [ columns ] = useState( () => [
      {
         Header: 'Номер заявки',
         CellTitle: 'Номер CCMP',
         accessor: 'number', // accessor is the "key" in the data
         tooltip: 'tooltip col1',
      },
      {
         Header: 'Бывший продавец',
         CellTitle: 'Бывший продавец',
         accessor: 'prevSeller',
         tooltip: 'tooltip col2',
      },
      {
         Header: 'Будущий продавец',
         CellTitle: 'Будущий продавец',
         accessor: 'nextSeller',
         tooltip: 'tooltip col3',
      },
      {
         Header: 'Кто внес позицию',
         CellTitle: 'Кто внес позицию',
         accessor: 'contributed',
         tooltip: 'tooltip col4',
      },
      {
         Header: 'Ответственный',
         CellTitle: 'ФИО',
         accessor: 'name',
         tooltip: 'tooltip col5',
      },
      {
         Header: 'Дубли заявок',
         CellTitle: '',
         accessor: 'double',
         tooltip: 'tooltip col6',
      },
      {
         Header: 'Вложения',
         CellTitle: '',
         accessor: 'attachments',
         tooltip: 'tooltip col7',
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

   function onChange( cell ) {
      const { row, value, column } = cell
      updateMyData( row.index, column.id, value )
   }


   return (
      <div className={ s.TableMatching }>
         { headerGroups.map( headerGroup =>
            <div className={ s.TableMatching__head } { ...headerGroup.getHeaderGroupProps() }>
               { headerGroup.headers.map( column =>
                  <TableColumn key={ column.render( 'Header' ) } column={ column }/>
               ) }
            </div>
         ) }

         { rows.map( row => {
            prepareRow( row )
            return (
               <div className={ s.TableMatching__row } { ...row.getRowProps() }>
                  <div className={ s.TableMatching__row_main }>
                     { row.cells.map( cell => {
                           if ( cell.column.id === 'double' ) return (
                              <div { ...cell.getCellProps() }>
                                 <Counter
                                    onChange={ () => onChange( cell ) }
                                    min={ 1 }
                                    value={ cell.value }/>
                              </div>
                           )

                           if ( cell.column.id === 'attachments' ) return (
                              <div{ ...cell.getCellProps() } className={s.download_icon}/>
                           )

                           return <div { ...cell.getCellProps() }>{ cell.render( 'Cell' ) }</div>
                        }
                     ) }
                  </div>
               </div>
            )
         } ) }

      </div>
   )
}


export default TableMatching