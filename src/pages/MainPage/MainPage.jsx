import s from "./MainPage.module.scss"
import MainHeader from "../../components/MainHeader/MainHeader";
import TableContainer from "../../components/TableContainer/TableContainer";
import { Button } from "@megafon/ui-core";
import { ReactComponent as DownloadIcon } from '@megafon/ui-icons/basic-24-download_24.svg';
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import DownloadOrder from "../../components/Modal/DownloadOrder/DownloadOrder";


function MainPage() {
   const { visible, closeModal, showModal } = useModal()

   return (
      <div className={ s.MainPage }>
         <MainHeader/>
         <div className={ `${ s.MainPage__container } wrapper` }>

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
         </div>
      </div>
   )
}


export default MainPage