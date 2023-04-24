import s from './OrderSuccess.module.scss'
import img from '../../../assets/images/type-order/finish.png'
import { useDispatch } from "react-redux";
import { FC } from "react";
import { goFinish } from "../../../redux/slices/orderSlice";
import { Button } from "@megafon/ui-core";


type TProps = {
   title: string
   description: string
   closeModal: () => void
}


const OrderSuccess: FC<TProps> = ( { title, description, closeModal } ) => {
   const dispatch = useDispatch()

   async function finish() {
      await closeModal()
      dispatch( goFinish() )
   }

   // useEffect( () => () => finish(), [] )

   return (
      <div className={ s.OrderSuccess }>
         <img
            src={ img }
            alt="finish"
            height={ 144 }
         />
         <h2 className={ s.OrderSuccess__title }>{ title }</h2>

         <p>{ description }</p>

         {/*@ts-ignore*/}
         <Button className={ s.OrderSuccess__button } onClick={ finish }>
            Отлично
         </Button>
      </div>
   )
}


export default OrderSuccess