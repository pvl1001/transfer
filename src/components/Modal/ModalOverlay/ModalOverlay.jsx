import s from "./ModalOverlay.module.scss";

function ModalOverlay( { onClose, transparent = false } ) {
   return (
      <div className={ `${s._} ${transparent ? s.transparent : ''}` } onClick={ onClose }/>
   )
}

export default ModalOverlay;