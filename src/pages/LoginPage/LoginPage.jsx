import s from './LoginPage.module.scss'
import Header from "../../components/Header/Header.jsx";
// import MainText from "../../components/MainText/MainText.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";


function LoginPage() {

   return (
      <div className={ s.LoginPage }>
         <div className="wrapper">
            <Header/>
            <main className={ s.LoginPage__main }>
               {/*<MainText/>*/}
               <LoginForm className={s.LoginPage__login_form}/>
            </main>
         </div>
      </div>
   )
}

export default LoginPage