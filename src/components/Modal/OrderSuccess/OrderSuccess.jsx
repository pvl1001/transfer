import s from './OrderSuccess.module.scss'
import img from '@images/type-order/finish.png'
import Button from "@/components-ui/Button/Button.jsx";
import { useDispatch } from "react-redux";
import { goFinish } from "@/store/slices/orderSlice.js";
import { useEffect } from "react";


function OrderSuccess( { title, description, closeModal } ) {
   const dispatch = useDispatch()

   function finish() {
      closeModal()
      dispatch( goFinish() )
   }

   useEffect(() => () => finish(),[])

   return (
      <div className={ s.OrderSuccess }>
         <img
            src={ img }
            alt="finish"
            height={ 144 }
         />
         <h2 className={ s.OrderSuccess__title }>{ title }</h2>

         <p>{ description }</p>

         <Button
            theme={ 'green' }
            className={ s.OrderSuccess__button }
            onClick={ finish }
         >
            Отлично!
         </Button>
      </div>
   )
}


export default OrderSuccess