import s from "./MainPage.module.scss"
import MainHeader from "@/components/MainHeader/MainHeader.jsx";
import TableContainer from "@/components/TableContainer/TableContainer.jsx";
import Modal from "@/components/Modal/Modal.jsx";
import useModal from "@/hooks/useModal.js";
import TypeOrder from "@/components/Modal/TypeOrder/TypeOrder.jsx";
import { useSelector } from "react-redux";
import OrderManually from "@/components/Modal/OrderManually/OrderManually.jsx";
import OrderFile from "@/components/Modal/OrderFile/OrderFile.jsx";


function MainPage() {
   const { visible, closeModal } = useModal()
   const order = useSelector( store => store.order )

   return (
      <div className={ s.MainPage }>
         <MainHeader/>
         <div className={ `${ s.MainPage__container } wrapper` }>
            <TableContainer/>
         </div>

         { visible &&
            <Modal
               onClose={ closeModal }
            >
               { order.type === '' && <TypeOrder/> }
               { order.type === 'manually' && <OrderManually/> }
               { order.type === 'xls' && <OrderFile/> }
            </Modal> }
      </div>
   )
}

export default MainPage