// @ts-nocheck
import { useEffect, useState } from "react";
import { useRowSelect, useTable } from "react-table";
import s from "./TableOperatos.module.scss";
import TableColumn from "../Table/TableColumn";
import TableRow from "./TableRow";
import checkboxToggleHandler from "../../utils/helpers/checkboxToggleHandler";
import DeletePanel from "../DeletePanel/DeletePanel";
import defaultColumn from "../Table/EditableCell";
import { operatorColumns as columns } from "../../data/table";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
   selectOperators,
   setCellOperators,
   thunkGetOperators
} from "../../redux/slices/tableOperatorsSlice";


function TableOperators() {
   const dispatch = useAppDispatch()
   const { data, selectId, pagination, tab } = useAppSelector( state => ({
      data: state.tableOperators.operators,
      selectId: state.tableOperators.selectedId,
      pagination: state.tableOperators.pagination.current,
      tab: state.tableOperators.tab.value,
   }) )
   const [ isVisibleDeletePanel, setIsVisibleDeletePanel ] = useState( false )

   const [ skipPageReset, setSkipPageReset ] = useState( false )
   const {
      headerGroups,
      rows,
      prepareRow,
      selectedFlatRows,
   } = useTable( { columns, data, defaultColumn, autoResetPage: !skipPageReset, updateMyData },
      useRowSelect,
      hooks => checkboxToggleHandler( hooks, setIsVisibleDeletePanel )
   )


   // Изменить данные таблицы
   function updateMyData( rowIndex, columnId, value ) {
      // Включаем флаг, чтобы не сбрасывать страницу
      setSkipPageReset( true )
      dispatch( setCellOperators( { rowIndex, columnId, value } ) )
   }

   useEffect( () => {
      setSkipPageReset( false )
   }, [ data ] )

   // получить данные таблицу
   useEffect( () => {
      if ( !data.length ) dispatch( thunkGetOperators( { method: 'GET' } ) )
   }, [] )

   useEffect( () => {
      dispatch( selectOperators( selectedFlatRows.map( d => d.original.id ) ) )
   }, [ selectedFlatRows ] )


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
            <DeletePanel
               thunkDelete={ () => thunkGetOperators( { method: 'DELETE', payload: { id: selectId, pagination, tab } } ) }
               setIsVisibleDeletePanel={ setIsVisibleDeletePanel }
            /> }
      </div>
   )
}

export default TableOperators