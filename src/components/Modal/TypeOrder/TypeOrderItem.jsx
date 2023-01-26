import s from "@/components/Modal/TypeOrder/TypeOrder.module.scss"
import { useDispatch } from "react-redux"
import { setOrderType } from "@/store/slices/orderSlice.js";

function TypeOrderItem( { data } ) {
   const { id, img, name, description } = data
   const dispatch = useDispatch()

   function onClickHandler() {
      dispatch( setOrderType( id ) )
   }


   return (
      <div className={ s.TypeOrder__item } onClick={ onClickHandler }>
         <img className={ s.TypeOrder__image }
              src={ img }
              alt={ id }
              height={ 144 }
         />
         <h5 className={ s.TypeOrder__name }>{ name }</h5>
         <p>{ description }</p>
      </div>
   )
}

export default TypeOrderItem