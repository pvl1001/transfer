import s from './Modal.module.scss'
import { createPortal } from "react-dom"
import { FC, PropsWithChildren, ReactNode, useEffect, useRef } from "react";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import { CSSTransition } from "react-transition-group";


type TProps = {
   onClose: () => void
   title?: string | ReactNode
   isShow: boolean
}

const Modal: FC<PropsWithChildren<TProps>> = ( { children, title, onClose, isShow } ) => {
   const modalRef = useRef( null )
   useEffect( () => {
      function keydownHandler( e: KeyboardEvent ) {
         if ( e.key === 'Escape' ) onClose()
      }

      document.addEventListener( 'keydown', keydownHandler )
      return () => document.removeEventListener( 'keydown', keydownHandler )
   }, [] )


   return createPortal(
      <CSSTransition
         in={ isShow }
         classNames={ 'modal' }
         timeout={ 200 }
         ref={ modalRef }
         unmountOnExit
      >
         <div className={ s.Modal }>
            <div className={ s.Modal__modal + ' modal-container' }>

               <button className={ s.Modal__close_btn } onClick={ onClose }/>

               { title && <h2>{ title }</h2> }

               { children }
            </div>

            <ModalOverlay onClose={ onClose }/>
         </div>
      </CSSTransition>
      , document.getElementById( 'modal' ) as HTMLElement
   )
}


export default Modal