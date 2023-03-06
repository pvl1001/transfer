import s from "./MainPage.module.scss"
import MainHeader from "../../components/MainHeader/MainHeader";
import { useState } from "react";
import Orders from "../../components/Orders";
import Operators from "../../components/Operators";


function MainPage() {
   const [ tabIndex, setTabIndex ] = useState( 0 )

   function onTabClick( i ) {
      setTabIndex( i )
   }


   return (
      <div className={ s.MainPage }>
         <MainHeader onTabClick={ onTabClick }/>
         <div className={ `${ s.MainPage__container } wrapper` }>
            { tabIndex === 0 && <Orders/> }
            { tabIndex === 1 && <Operators/> }
         </div>
      </div>
   )
}


export default MainPage