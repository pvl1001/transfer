import OrderManuallyStep4 from "@/components/Modal/OrderManually/OrderManuallyStep4.jsx";
import WithModalTitle from "@/components/Modal/WithModalTitle.jsx";


function OrderFile() {
   return (
      <div>
         <WithModalTitle
            title={'Импортировать файл'}
         >
            <OrderManuallyStep4
               accept={ { 'application/vnd.ms-excel': ['.xls'] } }
               dropzoneDescription={ 'Перетащите файл сюда (формат XLS до 5 МБ)' }/>
         </WithModalTitle>

      </div>
   )
}


export default OrderFile