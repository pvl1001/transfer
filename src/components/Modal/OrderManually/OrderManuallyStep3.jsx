import s from "@/components/Modal/OrderManually/OrderManually.module.scss"
import Range from "@/components-ui/Range/Range.jsx"
import { Field, Form, Formik } from "formik"
import Input from "@/components-ui/Input/Input.jsx"
import onValidHelper from "@/utils/helpers/onValidHelper.js"
import Select from "@/components-ui/Select/Select.jsx"
import Button from "@/components-ui/Button/Button.jsx"
import { useDispatch } from "react-redux";
import { object, string } from "yup";
import { setOrderData } from "@/store/slices/orderSlice.js";
import Counter from "@/components-ui/Counter/Counter.jsx";
import { useState } from "react";


function OrderManuallyStep1() {
   const dispatch = useDispatch()
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
               orderNumberBefore: '',
               author: '',
               duplicate: 1,
               cause: '',
            } }
            validateOnBlur
            validationSchema={ validationSchema }
            onSubmit={ submitHandler }>{
            ( {
                 errors,
                 touched,
                 dirty,
                 setFieldValue,
              } ) =>
               <Form className={ s.OrderManually__form }>
                  <div className={ s.OrderManually__form_container_step2 }>
                     <Field
                        as={ Input }
                        type={ 'number' }
                        name={ 'orderNumberBefore' }
                        label={ 'Номер ранней заявки' }
                        setFieldValue={ setFieldValue }
                        classValid={ onValidHelper( errors['orderNumberBefore'], touched['orderNumberBefore'], dirty ) }
                     />
                     <Field
                        as={ Select }
                        name="author"
                        placeholder={ 'Ответственный' }
                        options={ [ 'Первый', 'Второй' ] }
                        className={ s.OrderManually__select }
                        setFieldValue={ setFieldValue }
                        classValid={ onValidHelper( errors['author'], touched['author'], dirty ) }
                     />
                     <div className={ `input ${ s.OrderManually__input_counter } ${ validCounter }` }>
                        Дубли заявок
                        <Field
                           as={ Counter }
                           name={ 'duplicate' }
                           setFieldValue={ setFieldValue }
                        />
                     </div>
                     <Field
                        as={ Select }
                        name="cause"
                        placeholder={ 'Причина переноса' }
                        options={ [ 'ХЗ', 'И еще' ] }
                        className={ s.OrderManually__select }
                        setFieldValue={ setFieldValue }
                        classValid={ onValidHelper( errors['cause'], touched['cause'], dirty ) }
                     />
                  </div>

                  <Button
                     type="submit"
                     theme={ 'green' }
                     className={ s.OrderManually__btn }
                     onClick={ clickNextHandler }
                  >Далее</Button>
               </Form> }
         </Formik>

      </div>
   )
}

export default OrderManuallyStep1