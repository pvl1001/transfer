import s from './OrderManually.module.scss'
import { useDispatch, useSelector } from "react-redux";
import OrderManuallyStep1 from "@/components/Modal/OrderManually/OrderManuallyStep1.jsx";
import OrderManuallyStep2 from "@/components/Modal/OrderManually/OrderManuallyStep2.jsx";
import OrderManuallyStep3 from "@/components/Modal/OrderManually/OrderManuallyStep3.jsx";
import OrderManuallyStep4 from "@/components/Modal/OrderManually/OrderManuallyStep4.jsx";
import { goBack } from "@/store/slices/orderSlice.js";


function OrderManually() {
   const dispatch = useDispatch()
   const order = useSelector( store => store.order )

   function goBackHandler() {
      dispatch( goBack() )
   }


   return (
      <div className={ s.OrderManually }>
         { order.step > 1 &&
            <button
               type="button"
               className={ s.OrderManually__btn_back }
               onClick={ goBackHandler }
            /> }

         { order.step === 4
            ? <>
               <h2>Добавить основание</h2>
               <p className={ s.OrderManually__description }>
                  Приложите файлы, которые могут являться <br/> основанием для отказа.</p>
            </>
            : <>
               <h2>Добавить заявку</h2>
               <p className={ s.OrderManually__description }>
                  Внесите все данные по заявке корректно.<br/>Это очень важно.</p>
            </>
         }

         { order.step === 1 && <OrderManuallyStep1/> }
         { order.step === 2 && <OrderManuallyStep2/> }
         { order.step === 3 && <OrderManuallyStep3/> }
         { order.step === 4 && <OrderManuallyStep4/> }
      </div>
   )
}


export default OrderManually
