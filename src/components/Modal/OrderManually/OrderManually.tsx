import s from './OrderManually.module.scss'
import { goBack, setOrderType } from "../../../redux/slices/orderSlice";
import WithModalTitle from "../WithModalTitle/WithModalTitle";
import OrderManuallyStep1 from "./OrderManuallyStep1";
import OrderManuallyStep2 from "./OrderManuallyStep2";
import OrderManuallyStep3 from "./OrderManuallyStep3";
import DropZone from "./DropZone";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import useOrdersRequest from "../../../hooks/useOrdersRequest";


function OrderManually() {
   const dispatch = useAppDispatch()
   const { createOrder } = useOrdersRequest()
   const {
      order,
      orderForm,
      tab,
      pagination,
      isLoading,
   } = useAppSelector( state => ({
      order: state.order,
      orderForm: state.order.data,
      tab: state.tableOrders.tab.value,
      pagination: state.tableOrders.pagination.current,
      isLoading: state.tableOrders.status === 'loading',
   }) )

   function goBackHandler() {
      dispatch( goBack() )
   }

   function submitHandler( files: File[] ) {
      const formData = new FormData()
      formData.append( 'orderForm', JSON.stringify( orderForm ) )
      formData.append( 'tab', tab )
      formData.append( 'pagination', `${ pagination }` )
      files.forEach( ( file, i ) => formData.append( 'img' + i, file ) )

      return createOrder( formData )
   }


   return (
      <div className={ s.OrderManually }>
         { order.step >= 2 && order.step <= 4 && !isLoading &&
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
               <DropZone
                  accept={ { 'image/jpeg': [] } }
                  dropzoneDescription={ 'Перетащите файл сюда (формат JPG до 5 МБ)' }
                  submitHandler={ submitHandler }
                  cbSubmit={ () => dispatch( setOrderType( 'manually_success' ) ) }
               />
            </WithModalTitle>
         }
      </div>
   )
}


export default OrderManually
