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
import { selectOperators, setCellOperators, } from "../../redux/slices/tableOperatorsSlice";
import useAlert from "../../hooks/useAlert";
import useOperatorsRequest from "../../hooks/useOperatorsRequest";


function TableOperators() {
   const dispatch = useAppDispatch()
   const { alertSuccess } = useAlert()
   const { updateOperator, deleteOperators } = useOperatorsRequest()
   const { data, selectId, pagination, tab, search } = useAppSelector( state => ({
      data: state.tableOperators.operators,
      selectId: state.tableOperators.selectedId,
      pagination: state.tableOperators.pagination.current,
      tab: state.tableOperators.tab.value,
      search: state.tableOperators.search,
   }) )
   const [ rowIndexChanged, setIndexRowChanged ] = useState( null )
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
      setIndexRowChanged( rowIndex )
   }

   useEffect( () => {
      (async function () {
         if ( rowIndexChanged !== null ) {
            const res = await updateOperator( rowIndexChanged )
            if ( !res.error ) alertSuccess( 'Данные сохранены!' )
            setIndexRowChanged( null )
         }
      })()
   }, [ rowIndexChanged ] )

   useEffect( () => {
      setSkipPageReset( false )
   }, [ data ] )

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
               thunkDelete={ deleteOperators }
               cancel={ () => setIsVisibleDeletePanel( false ) }
            /> }
      </div>
   )
}

export default TableOperators