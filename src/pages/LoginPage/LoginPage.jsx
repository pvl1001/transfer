import s from './LoginPage.module.scss'
import LoginHeader from "../../components/LoginHeader/LoginHeader.jsx";
// import MainText from "../../components/MainText/MainText.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";


function LoginPage() {

   return (
      <div className={ s.LoginPage }>
         <div className="wrapper">
            <LoginHeader/>
            <main className={ s.LoginPage__main }>
               {/*<MainText/>*/ }
               <LoginForm className={ s.LoginPage__login_form }/>
            </main>
         </div>
      </div>
   )
}

export default LoginPage