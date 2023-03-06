import s from "../OrderManually/OrderManually.module.scss"
import { Field, Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { useState } from "react";
import { setOrderData } from "../../../store/slices/orderSlice";
import Input from "../../../components-ui/Input/Input";
import onValidHelper from "../../../utils/helpers/onValidHelper";
import Select from "../../../components-ui/Select/Select";
import Counter from "../../../components-ui/Counter/Counter";
import Button from "../../../components-ui/Button/Button";
import Range from "../../../components-ui/Range/Range";


function OrderManuallyStep2() {
   const dispatch = useDispatch()
   const {
      orderNumberBefore,
      author,
      duplicate,
      cause,
   } = useSelector( store => store.order.data)
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
                        required
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
                        required
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

export default OrderManuallyStep2