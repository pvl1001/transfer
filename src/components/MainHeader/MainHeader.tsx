import s from './MainHeader.module.scss'
import Menu from "./Menu/Menu";
import HeaderTabs from "./Tabs/HeaderTabs";
import { useAppSelector } from "../../redux/store";

function MainHeader() {
   const { user } = useAppSelector( state => state.auth )

   return (
      <header className={ s.MainHeader }>
         <div className={ s.MainHeader__wrapper + ' wrapper' }>
            <div className={ s.MainHeader__logo }/>
            { user?.role === 'Администратор' && <HeaderTabs className={ s.HeaderTabs }/> }
            <Menu className={ s.Menu }/>
         </div>
      </header>
   )
}

export default MainHeader