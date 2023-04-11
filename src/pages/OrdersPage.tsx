import s from "./MainPage.module.scss";
import TableContainer from "../components/Table/TableContainer/TableContainer";
import { Button } from "@megafon/ui-core";
import Modal from "../components/Modal/Modal";
import DownloadOrder from "../components/Modal/DownloadOrder/DownloadOrder";
import { ReactComponent as DownloadIcon } from '@megafon/ui-icons/basic-24-download_24.svg';
import useModal from "../hooks/useModal";
import useQuery from "../hooks/useQuery";
import { useEffect } from "react";
import { thunkGetOrders } from "../redux/slices/tableOrdersSlice";
import { useAppDispatch } from "../redux/store";


function OrdersPage() {
   const dispatch = useAppDispatch()
   const query = useQuery( 'tableOrders' )
   const { visible, closeModal, showModal } = useModal()

   // получить данные таблицы
   useEffect( () => {
      dispatch( thunkGetOrders( { method: "GET", query } ) )
   }, [ query ] )


   return (
      <>
         <TableContainer/>

         <Button
            theme="purple"
            icon={ <DownloadIcon/> }
            className={ s.MainPage__download_btn }
            onClick={ showModal }
         >
            Выгрузить заявки в .XLS
         </Button>

         { visible &&
            <Modal onClose={ closeModal }>
               <DownloadOrder/>
            </Modal> }
      </>
   )
}

export default OrdersPage;