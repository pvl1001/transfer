import s from './LoginForm.module.scss'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { signin } from "../../../redux/slices/authSlice";
import { Button, TextField, TextLink } from "@megafon/ui-core";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { validateError } from "../../../utils/helpers/validate";


function LoginForm( { className = '' } ) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()

   const validationSchema = object().shape( {
      login: string().min( 6 ).required(),
      password: string().min( 6 ).required(),
   } )

   function submit( data ) {
      dispatch( signin( {
         login: data.login,
         password: data.password,
         role: '',
      } ) )

      navigate( location.state?.from?.pathname || '/orders', { replace: true } )
   }


   return (
      <div className={ `${ s._ } ${ className }` }>
         <div className={ s.title }>
            <h2>Вход для сотрудников</h2>
            <p>Введите свои данные, чтобы войти</p>
         </div>

         <Formik
            initialValues={ {
               login: '',
               password: '',
            } }
            validateOnBlur
            validationSchema={ validationSchema }
            onSubmit={ submit }
         >{ ( { errors, touched, dirty } ) =>
            <Form
               name="address_order"
               className={ s.form }
            >
               <fieldset>
                  <Field
                     as={ TextField }
                     required
                     hidePlaceholder
                     type="text"
                     name="login"
                     label="Логин"
                     className={ s.input }
                     verification={ validateError( errors['login'], touched['login'], dirty ) }
                  />
                  <Field
                     as={ TextField }
                     required
                     hidePlaceholder
                     type="text"
                     name="password"
                     label="Пароль"
                     className={ s.input }
                     verification={ validateError( errors['password'], touched['password'], dirty ) }
                  />
               </fieldset>

               <div className={ s.btns }>
                  <Button actionType={ 'submit' } sizeAll={'large'}>Войти в систему</Button>
                  <TextLink className={ s.forgot_btn }>Забыли пароль?</TextLink>
               </div>

            </Form>
         }
         </Formik>

      </div>
   )
}


export default LoginForm