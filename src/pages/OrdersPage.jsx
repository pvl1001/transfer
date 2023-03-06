import React from 'react';
import TableContainer from "../components/TableContainer/TableContainer";
import { Button } from "@megafon/ui-core";
import s from "./MainPage/MainPage.module.scss";
import Modal from "../components/Modal/Modal";
import DownloadOrder from "../components/Modal/DownloadOrder/DownloadOrder";
import { ReactComponent as DownloadIcon } from '@megafon/ui-icons/basic-24-download_24.svg';
import useModal from "../hooks/useModal";


function OrdersPage() {
   const { visible, closeModal, showModal } = useModal()

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
   );
}

export default OrdersPage;