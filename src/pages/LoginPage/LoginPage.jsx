import s from './LoginPage.module.scss'
import LoginForm from "../../components/Login/LoginForm/LoginForm.jsx";
import LoginGreenBox from "../../components/Login/LoginGreenBox/LoginGreenBox";

function LoginPage() {

   return (
      <div className={ s._ }>
         <div className={ s.wrapper + " wrapper" }>

            <LoginGreenBox/>

            <main className={ s.main }>

               <p className={ s.support }>По всем вопросам: <b>support@megafon.ru</b></p>

               <LoginForm/>

               <p className={ s.copyright }>© { new Date().getFullYear() } ПАО «МегаФон»</p>

            </main>
         </div>
      </div>
   )
}

export default LoginPage