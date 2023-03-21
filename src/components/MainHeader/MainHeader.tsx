import s from './MainHeader.module.scss'
import Menu from "./Menu/Menu";
import HeaderTabs from "./Tabs/HeaderTabs";

function MainHeader() {
   return (
      <header className={ s.MainHeader }>
         <div className={ s.MainHeader__wrapper + ' wrapper' }>
            <div className={ s.MainHeader__logo }/>
            <HeaderTabs className={ s.HeaderTabs }/>
            <Menu className={ s.Menu }/>
         </div>
      </header>
   )
}

export default MainHeader