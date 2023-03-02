import s from "./MainPage.module.scss"
import MainHeader from "@/components/MainHeader/MainHeader.jsx";
import TableContainer from "@/components/TableContainer/TableContainer.jsx";


function MainPage() {

   return (
      <div className={ s.MainPage }>
         <MainHeader/>
         <div className={ `${ s.MainPage__container } wrapper` }>
            <TableContainer/>
         </div>
      </div>
   )
}


export default MainPage