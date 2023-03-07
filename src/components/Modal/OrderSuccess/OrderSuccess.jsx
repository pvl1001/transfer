import s from './OrderSuccess.module.scss'
import img from '../../../assets/images/type-order/finish.png'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { goFinish } from "../../../store/slices/orderSlice";
import Button from "../../../components-ui/Button/Button";
import PropTypes from "prop-types";


OrderSuccess.propTypes = {
   title: PropTypes.string.isRequired,
   description: PropTypes.string.isRequired,
   closeModal: PropTypes.func.isRequired,
}


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