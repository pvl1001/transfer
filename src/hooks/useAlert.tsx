import { useAppDispatch } from "../redux/store";
import { setAlert } from "../redux/slices/alertSlice";

function UseAlert() {
   const dispatch = useAppDispatch()

   return (
      {
         alertWarning: ( message: string ) => dispatch( setAlert( {
            severity: 'warning',
            message: message
         } ) ),
         alertSuccess: ( message: string ) => dispatch( setAlert( {
            severity: 'success',
            message: message
         } ) ),
         alertError: ( message: string ) => dispatch( setAlert( {
            severity: 'error',
            message: message
         } ) ),
         resetAlert: () => dispatch( setAlert( null ) ),
      }
   )

}

export default UseAlert;