import s from "./ModalOverlay.module.scss";
import { FC } from "react";


type TProps = {
   onClose: () => void
   transparent?: boolean
}


const ModalOverlay: FC<TProps> = ( { onClose, transparent } ) => {
   return (
      <div className={ `${ s._ } ${ transparent ? s.transparent : '' }` } onClick={ onClose }/>
   )
}


export default ModalOverlay;