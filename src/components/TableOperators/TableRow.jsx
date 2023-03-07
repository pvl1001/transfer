import s from "./TableOperatos.module.scss"
import Checkbox from "../../components-ui/Checkbox/Checkbox.jsx"


function TableRow( { row } ) {
   return (
      <div className={ s.Table__row }>
         <div className={ s.Table__row_main }>
            <div><Checkbox/></div>
            { row.cells.map( cell =>
               <div { ...cell.getCellProps() }>{ cell.render( 'Cell' ) }</div>
            ) }
         </div>
      </div>
   )
}


export default TableRow