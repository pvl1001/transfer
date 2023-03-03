import s from "./MainPage.module.scss"
import MainHeader from "../../components/MainHeader/MainHeader";
import TableContainer from "../../components/TableContainer/TableContainer";
import { Button } from "@megafon/ui-core";
import { ReactComponent as Icon } from '@megafon/ui-icons/basic-24-download_24.svg';


function MainPage() {
   return (
      <div className={ s.MainPage }>
         <MainHeader/>
         <div className={ `${ s.MainPage__container } wrapper` }>
            <TableContainer/>
            <Button theme="purple" icon={ <Icon/> } className={ s.MainPage__download_btn }>
               Выгрузить заявки в .XLS
            </Button>
         </div>
      </div>
   )
}


export default MainPage