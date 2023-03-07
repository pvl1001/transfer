import { Button } from "@megafon/ui-core";
import s from "./MainPage/MainPage.module.scss";
import { ReactComponent as DownloadIcon } from '@megafon/ui-icons/basic-24-download_24.svg';
import TableContainer from "../components/TableOperators/TableContainer/TableContainer";


function OperatorsPage() {

   return (
      <>
         <TableContainer/>
         <Button
            theme="purple"
            icon={ <DownloadIcon/> }
            className={ s.MainPage__download_btn }
         >
            Выгрузить операторов в .XLS
         </Button>
      </>
   )
}


export default OperatorsPage;