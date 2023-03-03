import s from './MainHeader.module.scss'
import Menu from "./Menu/Menu";

function MainHeader() {
   return (
      <header className={ s.MainHeader }>
         <div className={ s.MainHeader__wrapper + ' wrapper' }>
            <div className={ s.MainHeader__logo }/>
            <Menu/>
         </div>
      </header>
   )
}

export default MainHeader