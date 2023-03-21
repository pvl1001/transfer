import s from './Modal.module.scss'
import { createPortal } from "react-dom"
import { FC, PropsWithChildren, ReactNode, useEffect } from "react";
import ModalOverlay from "./ModalOverlay/ModalOverlay";


type TProps = {
   onClose: () => void
   title?: string | ReactNode
}

const Modal: FC<PropsWithChildren<TProps>> = ( { children, title, onClose } ) => {

   useEffect( () => {
      function keydownHandler( e: KeyboardEvent ) {
         if ( e.key === 'Escape' ) onClose()
      }

      document.addEventListener( 'keydown', keydownHandler )
      return () => document.removeEventListener( 'keydown', keydownHandler )
   }, [] )


   return createPortal(
      <div className={ s.Modal }>
         <div className={ s.Modal__modal }>

            <button className={ s.Modal__close_btn } onClick={ onClose }/>

            { title && <h2>{ title }</h2> }

            { children }
         </div>

         <ModalOverlay onClose={ onClose }/>
      </div>
      , document.getElementById( 'modal' ) as HTMLElement
   )
}


export default Modal