import s from './TableContainer.module.scss'
import Table from "@/components/Table/Table.jsx";
import Button from "@/components-ui/Button/Button.jsx";
import useModal from "@/hooks/useModal.js";
import Modal from "@/components/Modal/Modal.jsx";
import TypeOrder from "@/components/Modal/TypeOrder/TypeOrder.jsx";
import OrderManually from "@/components/Modal/OrderManually/OrderManually.jsx";
import OrderFile from "@/components/Modal/OrderFile/OrderFile.jsx";
import { useDispatch, useSelector } from "react-redux";
import OrderSuccess from "@/components/Modal/OrderSuccess/OrderSuccess.jsx";
import { resetOrderType } from "@/store/slices/orderSlice.js";


const successManual = {
   title: 'Заявка добавлена',
   description: 'Теперь она есть в списке всех заявок.',
}

const successXls = {
   title: 'Импорт завершен',
   description: 'Теперь все данные из файла есть в списке всех заявок.',
}


function TableContainer() {
   const dispatch = useDispatch()
   const { visible, closeModal, showModal } = useModal()
   const order = useSelector( store => store.order )

   function closeModalHandler() {
      closeModal()
      dispatch( resetOrderType() )
   }

   const successProps = order.type === 'manually'
      ? successManual
      : successXls


   return (
      <div className={ s.TableContainer }>
         <h1 className={ s.TableContainer__title }>Заявки</h1>
         <div>
            <Button theme={ 'green' } onClick={ showModal }>+ Новая заявка</Button>
         </div>

         <Table/>

         { visible &&
            <Modal onClose={ closeModalHandler }>
               { order.type === '' && <TypeOrder/> }
               { order.type === 'manually' && <OrderManually/> }
               { order.type === 'xls' && <OrderFile/> }
               { order.type === 'success' &&
                  <OrderSuccess
                     { ...successProps }
                     closeModal={ closeModal }
                  /> }
            </Modal> }
      </div>
   )
}

export default TableContainer