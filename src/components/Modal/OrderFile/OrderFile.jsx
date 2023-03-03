import WithModalTitle from "../WithModalTitle";
import OrderManuallyStep4 from "../OrderManually/OrderManuallyStep4";


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