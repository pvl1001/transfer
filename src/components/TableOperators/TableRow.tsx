import s from "./TableOperatos.module.scss"
import { Row, UseRowSelectRowProps } from "react-table";


function TableRow( { row }: { row: UseRowSelectRowProps<Row> } ) {
   return (
      <div className={ `${ s.Table__row } ${ row.isSelected ? s.checked : '' }` }>
         <div className={ s.Table__row_main }>
            {/*@ts-ignore*/ }
            { row.cells.map( cell => {
                  const { key, role } = cell.getCellProps()
                  return <div key={ key } role={ role }>{ cell.render( 'Cell' ) }</div>
               }
            ) }
         </div>
      </div>
   )
}


export default TableRow