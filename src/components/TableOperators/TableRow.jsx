import s from "./TableOperatos.module.scss"


function TableRow( { row } ) {
   return (
      <div className={ `${ s.Table__row } ${ row.isSelected ? s.checked : '' }` }>
         <div className={ s.Table__row_main }>
            { row.cells.map( cell =>
               <div { ...cell.getCellProps() }>{ cell.render( 'Cell' ) }</div>
            ) }
         </div>
      </div>
   )
}


export default TableRow