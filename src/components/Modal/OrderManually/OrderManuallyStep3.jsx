import s from "../OrderManually/OrderManually.module.scss"
import { Field, Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { setOrderData } from "../../../redux/slices/orderSlice";
import Range from "../../../components-ui/Range/Range";
import { Button, Select } from "@megafon/ui-core";
import { validateError } from "../../../utils/helpers/validate";


function OrderManuallyStep3() {
   const dispatch = useDispatch()
   const {
      exSeller,
      nextSeller,
   } = useSelector( store => store.order.data)

   const errorMessage = 'ошибка!'
   const validationSchema = object().shape( {
      exSeller: string().min( 2, errorMessage ).required( errorMessage ),
      nextSeller: string().min( 2, errorMessage ).required( errorMessage ),
   } )

   function submitHandler( data ) {
      dispatch( setOrderData( data ) )
   }


   return (
      <div className={ s.OrderManually }>

         <Range className={ s.OrderManually__range } range={ 90 }/>
         <Formik
            initialValues={ {
               exSeller,
               nextSeller,
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
                  <div className={ s.OrderManually__form_container_step3 }>
                     <Field
                        as={ Select }
                        required
                        name="exSeller"
                        label={ 'Бывший продавец' }
                        items={ [
                           { title: 'Вася', value: 'Вася' },
                           { title: 'Петя', value: 'Петя' } ] }
                        className={ s.OrderManually__select }
                        onSelect={ ( e, { value } ) => setFieldValue( 'exSeller', value ) }
                        currentValue={ values.exSeller }
                        verification={ validateError( errors['exSeller'], touched['exSeller'], dirty ) }
                     />
                     <Field
                        as={ Select }
                        required
                        name="nextSeller"
                        label={ 'Будущий продавец' }
                        items={ [
                           { title: 'Вася', value: 'Вася' },
                           { title: 'Петя', value: 'Петя' } ] }
                        className={ s.OrderManually__select }
                        onSelect={ ( e, { value } ) => setFieldValue( 'nextSeller', value ) }
                        currentValue={ values.nextSeller }
                        verification={ validateError( errors['nextSeller'], touched['nextSeller'], dirty ) }
                     />
                  </div>

                  <Button
                     actionType="submit"
                     className={ s.OrderManually__btn }
                  >Далее</Button>
               </Form> }
         </Formik>

      </div>
   )
}

export default OrderManuallyStep3