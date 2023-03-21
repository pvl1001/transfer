import { useEffect, useState } from "react";
import { useRowSelect, useTable } from "react-table";
import s from "./TableOperatos.module.scss";
import TableColumn from "../Table/TableColumn";
import TableRow from "./TableRow";
import checkboxToggleHandler from "../../utils/helpers/checkboxToggleHandler";
import DeletePanel from "../DeletePanel/DeletePanel";
import defaultColumn from "../Table/EditableCell";


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
      hooks => checkboxToggleHandler( hooks, setIsVisibleDeletePanel )
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
         { headerGroups.map( headerGroup => {
               const { key, role } = headerGroup.getHeaderGroupProps()
               return <div key={ key } role={ role } className={ s.Table__head }>
                  { headerGroup.headers.map( column =>
                     <TableColumn key={ column.id } column={ column }/>
                  ) }
               </div>
            }
         ) }

         { rows.map( row => {
            prepareRow( row )
            const { key, role } = row.getRowProps()
            return <TableRow key={ key } role={ role } row={ row }/>
         } ) }

         { !!selectedFlatRows.length && isVisibleDeletePanel &&
            <DeletePanel setIsVisibleDeletePanel={ setIsVisibleDeletePanel }/> }
      </div>
   )
}

export default TableOperators