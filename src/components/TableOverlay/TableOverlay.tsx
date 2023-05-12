import s from './TableOverlay.module.scss'
import { Preloader } from "@megafon/ui-core";

function TableOverlay() {
   return (
      <div className={ s._ }>
         <Preloader color="black"/>
      </div>
   )
}

export default TableOverlay;