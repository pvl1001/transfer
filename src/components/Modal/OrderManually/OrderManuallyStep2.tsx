import s from "../OrderManually/OrderManually.module.scss"
import { Field, Form, Formik } from "formik"
import { object, string } from "yup";
import { useState } from "react";
import { setOrderData } from "../../../redux/slices/orderSlice";
import Range from "../../../components-ui/Range/Range";
import { Button, Counter, Select, TextField } from "@megafon/ui-core";
import { validateError } from "../../../utils/helpers/validate";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { TOrderFormStep2 } from "../../../utils/types";


function OrderManuallyStep2() {
   const dispatch = useAppDispatch()
   const {
      before_order_number,
      responsible,
      duplicate,
      cause_transfer,
   } = useAppSelector( store => store.order.data as TOrderFormStep2 )
   const [ validCounter, setValidCounter ] = useState( '' )

   const errorMessage = 'ошибка!'
   const validationSchema = object().shape( {
      before_order_number: string().min( 2, errorMessage ).required( errorMessage ),
      responsible: string().min( 2, errorMessage ).required( errorMessage ),
      cause_transfer: string().min( 1, errorMessage ).required( errorMessage ),
   } )

   function clickNextHandler() {
      setValidCounter( s.valid )
   }

   function submitHandler( data: TOrderFormStep2 ) {
      dispatch( setOrderData( data ) )
   }


   return (
      <div className={ s.OrderManually }>

         <Range className={ s.OrderManually__range } range={ 45 }/>
         <Formik
            initialValues={ {
               before_order_number,
               responsible,
               duplicate,
               cause_transfer,
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
                        name={ 'before_order_number' }
                        label={ 'Номер ранней заявки' }
                        verification={ validateError( errors['before_order_number'], touched['before_order_number'], dirty ) }
                     />
                     <Field
                        as={ Select }
                        required
                        name="responsible"
                        label={ 'Ответственный' }
                        items={ [
                           { title: 'Вася', value: 'Вася' },
                           { title: 'Петя', value: 'Петя' }
                        ] }
                        className={ s.OrderManually__select }
                        onSelect={ ( e: Event, { value }: { value: string } ) => setFieldValue( 'responsible', value ) }
                        currentValue={ values.responsible }
                        verification={ validateError( errors['responsible'], touched['responsible'], dirty ) }
                     />
                     <div className={ `input ${ s.OrderManually__input_counter } ${ validCounter }` }>
                        Дубли заявок
                        <Field
                           as={ Counter }
                           min={ 1 }
                           name={ 'duplicate' }
                           onChange={ ( value: string ) => setFieldValue( 'duplicate', value ) }
                        />
                     </div>
                     <Field
                        as={ Select }
                        required
                        name="cause_transfer"
                        label={ 'Причина переноса' }
                        items={ [
                           { title: 'ХЗ', value: 'ХЗ' },
                           { title: 'Тест', value: 'Тест' }
                        ] }
                        className={ s.OrderManually__select }
                        onSelect={ ( e: Event, { value }: { value: string } ) => setFieldValue( 'cause_transfer', value ) }
                        currentValue={ values.cause_transfer }
                        verification={ validateError( errors['cause_transfer'], touched['cause_transfer'], dirty ) }
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