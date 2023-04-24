import s from "./AllertMessage.module.scss";
import { Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import useAlert from "../../hooks/useAlert";


function AlertMessage() {
   const dispatch = useAppDispatch()
   const { alertError, resetAlert } = useAlert()
   const [ isShow, setIsShow ] = useState( false )
   const alertRef = useRef( null )
   const { error, alert } = useAppSelector( state => ({
      error: state.tableOrders.error || state.tableOperators.error,
      alert: state.alert,
   }) )

   useEffect( () => {
      error && alertError( error )
   }, [ error ] )

   useEffect( () => {
      if ( alert ) {
         setIsShow( true )

         if ( alert.severity !== 'error' ) {
            setTimeout( () => setIsShow( false ), 3000 )
         }
      } else {
         setIsShow( false )
      }
   }, [ alert ] )


   return createPortal(
      <CSSTransition
         in={ isShow }
         classNames={ 'alert' }
         timeout={ 300 }
         ref={ alertRef }
         unmountOnExit
         onExited={ resetAlert }
      >
         <Alert
            ref={ alertRef }
            severity={ alert?.severity }
            classes={ { root: s._ } }
            onClose={ () => setIsShow( false ) }
         >
            { alert?.message ?? '' }
         </Alert>
      </CSSTransition>,
      document.getElementById( 'alert' ) as HTMLElement
   )

}


export default AlertMessage;