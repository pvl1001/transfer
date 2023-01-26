import s from './Modal.module.scss'
import { createPortal } from "react-dom"
import { useEffect } from "react";


function Modal( { children, title, onClose } ) {

   useEffect( () => {
      function keydownHandler( e ) {
         if ( e.key === 'Escape' ) onClose( e )
      }

      document.addEventListener( 'keydown', keydownHandler )
      return () => document.removeEventListener( 'keydown', keydownHandler )
   }, [] )


   return createPortal(
      <div className={ s.Modal }>
         <div className={ s.Modal__modal }>

            <button className={ s.Modal__close_btn } onClick={ onClose }/>

            <h2 className={ s.Modal__title }>{ title }</h2>

            { children }
         </div>

         <div className={ s.Modal__overlay } onClick={ onClose }/>
      </div>
      , document.getElementById( 'modal' )
   )
}


export default Modal