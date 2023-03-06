import s from './LoginForm.module.scss'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signin } from "../../store/slices/authSlice";


function LoginForm( { className = '' } ) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
   const { register, handleSubmit, formState: { errors } } = useForm()

   const input = {
      login: {
         type: "text",
         placeholder: 'Логин',
         error: 'Заполните поле!',
         className: errors.login ? 'error' : '',
         ...register( 'login', { required: true } )
      },
      password: {
         type: "text",
         placeholder: 'Пароль',
         error: 'Необходимо ввести 6 символов',
         className: errors.password ? 'error' : '',
         ...register( 'password', { required: true, minLength: 6 } )
      },
   }


   function onSubmit( data ) {
      dispatch( signin( {
         login: data.login,
         password: data.password,
         role: '',
      } ) )

      navigate( location.state?.from?.pathname || '/orders', { replace: true } )
   }


   return (
      <div className={ `${ s.LoginForm } ${ className }` }>
         <h3 className={ s.LoginForm__title }>
            Войдите по логину и паролю</h3>

         <form onSubmit={ handleSubmit( onSubmit ) } className={ s.LoginForm__form }>
            <div className={ s.LoginForm__input }>
               <input { ...input.login }/>
               { errors.login &&
                  <label className={ 'error' }>{ input.login.error }</label> }
            </div>

            <div className={ s.LoginForm__input }>
               <input { ...input.password }/>
               { errors.password &&
                  <label className={ 'error' }>{ input.password.error }</label> }
            </div>

            <div className={ s.LoginForm__btns }>
               <button
                  type={ 'submit' }
                  className={ 'btn' }
               >Войти в систему
               </button>
               <button
                  type={ 'button' }
                  className={ s.LoginForm__btn_forgot }
               >Забыли пароль?
               </button>
            </div>
         </form>
      </div>
   )
}


export default LoginForm