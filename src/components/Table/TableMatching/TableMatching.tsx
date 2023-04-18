// @ts-nocheck
import s from "./TableMatching.module.scss";
import { FC, useEffect, useState } from "react";
import { Row, useTable } from "react-table";
import TableColumn from "../TableColumn";
import { Counter } from "@megafon/ui-core";
import defaultColumn from "../EditableCell";
import { matchingColumns as columns } from '../../../data/table'
import { thunkDownloadFiles } from "../../../redux/slices/tableOrdersSlice";
import { useAppDispatch } from "../../../redux/store";
import useAlert from "../../../hooks/useAlert";


type TTableMatchingProps = {
   row: Row
   updateMyData: () => void
}

const TableMatching: FC<TTableMatchingProps> = ( { row: parentRow, updateMyData } ) => {
   const dispatch = useAppDispatch()
   const { alertWarning } = useAlert()
   const data = [ parentRow.original ]
   const [ skipPageReset, setSkipPageReset ] = useState( false )
   const {
      headerGroups,
      rows,
      prepareRow,
   } = useTable( { columns, data, defaultColumn, autoResetPage: !skipPageReset, updateMyData } )

   useEffect( () => {
      setSkipPageReset( false )
   }, [ data ] )

   function onChange( value, cell ) {
      const { column } = cell
      updateMyData( parentRow.index, column.id, value )
   }

   async function download( row ) {
      if ( row.original.images ) {
         return dispatch( thunkDownloadFiles( row.original ) )
      }
      alertWarning( 'Вложения отсутствуют' )
   }


   return (
      <div className={ s.TableMatching }>
         { headerGroups.map( headerGroup => {
               const { key, role } = headerGroup.getHeaderGroupProps()
               return <div key={ key } role={ role } className={ s.TableMatching__head }>
                  { headerGroup.headers.map( column =>
                     <TableColumn key={ column.id } column={ column }/>
                  ) }
               </div>
            }
         ) }

         { rows.map( row => {
            prepareRow( row )
            const { key, role } = row.getRowProps()
            return (
               <div key={ key } role={ role } className={ s.TableMatching__row }>
                  <div className={ s.TableMatching__row_main }>
                     { row.cells.map( cell => {
                           cell.row.index = parentRow.index
                           const { key, role } = cell.getCellProps()
                           if ( cell.column.id === 'duplicate' ) return (
                              <div key={ key } role={ role }>
                                 <Counter
                                    onChange={ value => onChange( value, cell ) }
                                    min={ 1 }
                                    initialValue={ cell.value }/>
                              </div>
                           )

                           if ( cell.column.id === 'attachments' ) return (
                              <div
                                 key={ key }
                                 role={ role }
                                 className={ s.download_icon }
                                 onClick={ () => download( row ) }
                              />
                           )

                           return <div key={ key } role={ role }>{ cell.render( 'Cell' ) }</div>
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