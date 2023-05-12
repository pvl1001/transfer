import s from './TableOverlay.module.scss'
import { Preloader } from "@megafon/ui-core";

type TTableOverlay = {
   preloader?: boolean
}

function TableOverlay( { preloader = true }: TTableOverlay ) {
   return (
      <div className={ s._ }>
         { preloader && <Preloader color="black"/> }
      </div>
   )
}

export default TableOverlay;