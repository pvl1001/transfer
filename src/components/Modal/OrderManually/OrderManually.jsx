import s from './OrderManually.module.scss'
import { useSelector } from "react-redux";

import OrderManuallyStep1 from "@/components/Modal/OrderManually/OrderManuallyStep1.jsx";
import OrderManuallyStep2 from "@/components/Modal/OrderManually/OrderManuallyStep2.jsx";


function OrderManually() {
   const order = useSelector( store => store.order )


   return (
      <div className={ s.OrderManually }>
         <h2>Добавить заявку</h2>
         <p className={ s.OrderManually__description }>
            Внесите все данные по заявке корректно.<br/>Это очень важно.</p>

         { order.step === 1 && <OrderManuallyStep1/> }
         { order.step === 2 && <OrderManuallyStep2/> }
      </div>
   )
}


export default OrderManually
