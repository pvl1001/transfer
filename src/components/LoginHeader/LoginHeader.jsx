import s from './LoginHeader.module.scss';

function LoginHeader() {
   return (
      <header className={ s.LoginHeader }>
         <div className={ s.LoginHeader__logo }/>
         <span className={ s.LoginHeader__text }>support@megafon.ru</span>
      </header>
   );
}

export default LoginHeader;