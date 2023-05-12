import { FC } from "react";
import s from './LoginForm.module.scss'
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { thunkLogin } from "../../../redux/slices/authSlice";
import { Button, TextField, TextLink } from "@megafon/ui-core";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { validateError } from "../../../utils/helpers/validate";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { TFormData } from "../../../utils/types";


type TProps = {
   className?: string
}


const LoginForm: FC<TProps> = ( { className = '' } ) => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const location = useLocation()
   const authError = useAppSelector( state => state.auth.error )

   const validationSchema = object().shape( {
      email: string().min( 6 ).required(),
      password: string().min( 6 ).required(),
   } )

   async function submit( data: TFormData ) {
      await dispatch( thunkLogin( data ) )
   }


   // @ts-ignore
   return (
      <div className={ `${ s._ } ${ className }` }>
         <div className={ s.title }>
            <h2>Вход для сотрудников</h2>
            <p>Введите свои данные, чтобы войти</p>
         </div>

         <Formik
            initialValues={ {
               email: '',
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
                     name="email"
                     label="Логин"
                     className={ s.input }
                     verification={ validateError( errors['email'], touched['email'], dirty, authError ) }
                  />
                  <Field
                     as={ TextField }
                     required
                     hidePlaceholder
                     type="password"
                     name="password"
                     label="Пароль"
                     className={ s.input }
                     verification={ validateError( errors['password'], touched['password'], dirty, authError ) }
                  />
               </fieldset>

               <div className={ s.btns }>
                  {/* @ts-ignore */ }
                  <Button actionType={ 'submit' } sizeAll={ 'large' }>
                     Войти в систему
                  </Button>

                  <TextLink className={ s.forgot_btn }>
                     Забыли пароль?
                  </TextLink>
               </div>

            </Form>
         }
         </Formik>

      </div>
   )
}


export default LoginForm