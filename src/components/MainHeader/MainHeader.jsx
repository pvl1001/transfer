import s from './MainHeader.module.scss'
import Menu from "@/components/MainHeader/Menu/Menu.jsx";

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