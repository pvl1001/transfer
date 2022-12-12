import s from './Header.module.scss';
import Logo from "../../assets/icons/Logo.jsx";

function Header() {
   return (
      <header className={ s.Header }>
         <Logo/>
         <span className={ s.Header__text }>support@megafon.ru</span>
      </header>
   );
}

export default Header;