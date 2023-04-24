import s from "./MainPage.module.scss";
import TableContainer from "../components/Table/TableContainer/TableContainer";
import { Button } from "@megafon/ui-core";
import Modal from "../components/Modal/Modal";
import DownloadOrder from "../components/Modal/DownloadOrder/DownloadOrder";
import { ReactComponent as DownloadIcon } from '@megafon/ui-icons/basic-24-download_24.svg';
import useModal from "../hooks/useModal";
import useQuery from "../hooks/useQuery";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/store";
import useOrdersRequest from "../hooks/useOrdersRequest";


function OrdersPage() {
   const dispatch = useAppDispatch()
   const { getOrders } = useOrdersRequest()
   const query = useQuery( 'tableOrders' )
   const { visible, closeModal, showModal } = useModal()

   // получить данные таблицы
   useEffect( () => {
      getOrders( query )
   }, [ query ] )


   return (
      <>
         <TableContainer/>
         {/* @ts-ignore */ }
         <Button
            theme="purple"
            icon={ <DownloadIcon/> }
            className={ s.MainPage__download_btn }
            onClick={ showModal }
         >
            Выгрузить заявки в .XLS
         </Button>

         <Modal onClose={ closeModal } isShow={ visible }>
            <DownloadOrder/>
         </Modal>
      </>
   )
}

export default OrdersPage;