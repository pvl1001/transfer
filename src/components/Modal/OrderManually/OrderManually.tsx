import s from './OrderManually.module.scss'
import { goBack } from "../../../redux/slices/orderSlice";
import WithModalTitle from "../WithModalTitle/WithModalTitle";
import OrderManuallyStep1 from "./OrderManuallyStep1";
import OrderManuallyStep2 from "./OrderManuallyStep2";
import OrderManuallyStep3 from "./OrderManuallyStep3";
import OrderManuallyStep4 from "./OrderManuallyStep4";
import { useAppDispatch, useAppSelector } from "../../../redux/store";


function OrderManually() {
   const dispatch = useAppDispatch()
   const order = useAppSelector( store => store.order )

   function goBackHandler() {
      dispatch( goBack() )
   }


   return (
      <div className={ s.OrderManually }>
         { order.step >= 2 && order.step <= 4 &&
            <button
               type="button"
               className={ s.OrderManually__btn_back }
               onClick={ goBackHandler }
            /> }

         { order.step < 4 && <WithModalTitle
            title={ 'Добавить заявку' }
            description={ 'Внесите все данные по заявке корректно.<br/>Это очень важно.' }
         >
            { order.step === 1 && <OrderManuallyStep1/> }
            { order.step === 2 && <OrderManuallyStep2/> }
            { order.step === 3 && <OrderManuallyStep3/> }
         </WithModalTitle> }

         { order.step === 4 &&
            <WithModalTitle
               title={ 'Добавить основание' }
               description={ 'Приложите файлы, которые могут являться <br/> основанием для отказа.' }
            >
               <OrderManuallyStep4
                  accept={ { 'image/jpeg': [] } }
                  dropzoneDescription={ 'Перетащите файл сюда (формат JPG до 5 МБ)' }
               />
            </WithModalTitle>
         }
      </div>
   )
}


export default OrderManually
