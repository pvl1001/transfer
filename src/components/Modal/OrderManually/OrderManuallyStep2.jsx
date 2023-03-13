import s from "../OrderManually/OrderManually.module.scss"
import { Field, Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { useState } from "react";
import { setOrderData } from "../../../redux/slices/orderSlice";
import Range from "../../../components-ui/Range/Range";
import { Button, Counter, Select, TextField } from "@megafon/ui-core";
import { validateError } from "../../../utils/helpers/validate";


function OrderManuallyStep2() {
   const dispatch = useDispatch()
   const {
      orderNumberBefore,
      author,
      duplicate,
      cause,
   } = useSelector( store => store.order.data )
   const [ validCounter, setValidCounter ] = useState( '' )

   const errorMessage = 'ошибка!'
   const validationSchema = object().shape( {
      orderNumberBefore: string().min( 2, errorMessage ).required( errorMessage ),
      author: string().min( 2, errorMessage ).required( errorMessage ),
      cause: string().min( 1, errorMessage ).required( errorMessage ),
   } )

   function clickNextHandler() {
      setValidCounter( s.valid )
   }

   function submitHandler( data ) {
      dispatch( setOrderData( data ) )
   }


   return (
      <div className={ s.OrderManually }>

         <Range className={ s.OrderManually__range } range={ 45 }/>
         <Formik
            initialValues={ {
               orderNumberBefore,
               author,
               duplicate,
               cause,
            } }
            validateOnBlur
            validationSchema={ validationSchema }
            onSubmit={ submitHandler }>{
            ( {
                 values,
                 errors,
                 touched,
                 dirty,
                 setFieldValue,
              } ) =>
               <Form className={ s.OrderManually__form }>
                  <div className={ s.OrderManually__form_container_step2 }>
                     <Field
                        as={ TextField }
                        required
                        hidePlaceholder
                        type={ 'text' }
                        name={ 'orderNumberBefore' }
                        label={ 'Номер ранней заявки' }
                        verification={ validateError( errors['orderNumberBefore'], touched['orderNumberBefore'], dirty ) }
                     />
                     <Field
                        as={ Select }
                        required
                        name="author"
                        label={ 'Ответственный' }
                        items={ [
                           { title: 'Вася', value: 'Вася' },
                           { title: 'Петя', value: 'Петя' }
                        ] }
                        className={ s.OrderManually__select }
                        onSelect={ ( e, { value } ) => setFieldValue( 'author', value ) }
                        currentValue={ values.author }
                        verification={ validateError( errors['author'], touched['author'], dirty ) }
                     />
                     <div className={ `input ${ s.OrderManually__input_counter } ${ validCounter }` }>
                        Дубли заявок
                        <Field
                           as={ Counter }
                           min={ 1 }
                           name={ 'duplicate' }
                           onChange={ value => setFieldValue('duplicate', value) }
                        />
                     </div>
                     <Field
                        as={ Select }
                        required
                        name="cause"
                        label={ 'Причина переноса' }
                        items={ [
                           { title: 'ХЗ', value: 'ХЗ' },
                           { title: 'Тест', value: 'Тест' }
                        ] }
                        className={ s.OrderManually__select }
                        onSelect={ ( e, { value } ) => setFieldValue( 'cause', value ) }
                        currentValue={ values.cause }
                        verification={ validateError( errors['cause'], touched['cause'], dirty ) }
                     />
                  </div>

                  <Button
                     actionType="submit"
                     className={ s.OrderManually__btn }
                     onClick={ clickNextHandler }
                  >Далее</Button>
               </Form> }
         </Formik>

      </div>
   )
}

export default OrderManuallyStep2