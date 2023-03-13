import s from './TypeOrder.module.scss'
import TypeHandImage from '../../../assets/images/type-order/Illustration.png'
import TypeXlsImage from '../../../assets/images/type-order/Illustration (1).png'
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setOrderType } from "../../../redux/slices/orderSlice";
import TypeOrderItem from "./TypeOrderItem";


function TypeOrder() {
   const dispatch = useDispatch()

   const typeOrder = [
      {
         id: 'manually',
         img: TypeHandImage,
         name: 'Ввести вручную',
         description: 'При вводе данных убедитесь, что заполнили все корректно. Это крайне важно.',
      },
      {
         id: 'xls',
         img: TypeXlsImage,
         name: 'Импортировать файл XLS',
         description: 'Внимательно проверьте, чтобы все данные в таблице были корректно заполнены.',
      },
   ]

   const onClickHandler = useCallback( ( id ) => {
      dispatch( setOrderType( id ) )
   }, [ dispatch, setOrderType ] )


   return (
      <div className={ s.TypeOrder }>
         <h2>Каким образом хотите добавить заявки?</h2>

         <div className={ s.TypeOrder__container }>
            { typeOrder.map( el =>
               <TypeOrderItem
                  key={ el.id }
                  data={ el }
                  onClick={ onClickHandler }
               />
            ) }
         </div>

      </div>
   )
}


export default TypeOrder