import s from "./MainPage.module.scss"
import MainHeader from "@/components/MainHeader/MainHeader.jsx";
import Table from "@/components/Table/Table.jsx";

function MainPage() {

   return (
      <div className={ s.MainPage }>
         <MainHeader/>
         <div className={ `${ s.MainPage__container } wrapper` }>
            <Table/>
         </div>
      </div>
   )
}

export default MainPage