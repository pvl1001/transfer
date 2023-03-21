import s from './TypeOrder.module.scss'
import TypeHandImage from '../../../assets/images/type-order/Illustration.png'
import TypeXlsImage from '../../../assets/images/type-order/Illustration (1).png'
import { useCallback } from "react";
import { setOrderType } from "../../../redux/slices/orderSlice";
import TypeOrderItem from "./TypeOrderItem";
import { useAppDispatch } from "../../../redux/store";
import { TTypeOrder } from "../../../utils/types";


const typeOrder: Array<TTypeOrder> = [
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


function TypeOrder() {
   const dispatch = useAppDispatch()

   const onClickHandler = useCallback( ( id: string ) => {
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