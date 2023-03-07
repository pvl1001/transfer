import { Button } from "@megafon/ui-core";
import s from "./MainPage/MainPage.module.scss";
import Modal from "../components/Modal/Modal";
import DownloadOrder from "../components/Modal/DownloadOrder/DownloadOrder";
import useModal from "../hooks/useModal";
import { ReactComponent as DownloadIcon } from '@megafon/ui-icons/basic-24-download_24.svg';
import TableContainer from "../components/TableOperators/TableContainer/TableContainer";


function OperatorsPage() {
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
            Выгрузить операторов в .XLS
         </Button>

         { visible &&
            <Modal onClose={ closeModal }>
               <DownloadOrder/>
            </Modal> }
      </>
   )
}


export default OperatorsPage;