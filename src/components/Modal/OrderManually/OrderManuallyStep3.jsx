import s from "@/components/Modal/OrderManually/OrderManually.module.scss"
import Range from "@/components-ui/Range/Range.jsx"
import { Field, Form, Formik } from "formik"
import onValidHelper from "@/utils/helpers/onValidHelper.js"
import Select from "@/components-ui/Select/Select.jsx"
import Button from "@/components-ui/Button/Button.jsx"
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { setOrderData } from "@/store/slices/orderSlice.js";


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
                 errors,
                 touched,
                 dirty,
                 setFieldValue,
              } ) =>
               <Form className={ s.OrderManually__form }>
                  <div className={ s.OrderManually__form_container_step3 }>
                     <Field
                        as={ Select }
                        name="exSeller"
                        placeholder={ 'Бывший продавец' }
                        options={ [ 'Вася', 'Петя' ] }
                        className={ s.OrderManually__select }
                        setFieldValue={ setFieldValue }
                        classValid={ onValidHelper( errors['exSeller'], touched['exSeller'], dirty ) }
                     />
                     <Field
                        as={ Select }
                        name="nextSeller"
                        placeholder={ 'Будущий продавец' }
                        options={ [ 'Вася', 'Петя' ] }
                        className={ s.OrderManually__select }
                        setFieldValue={ setFieldValue }
                        classValid={ onValidHelper( errors['nextSeller'], touched['nextSeller'], dirty ) }
                     />
                  </div>

                  <Button
                     type="submit"
                     theme={ 'green' }
                     className={ s.OrderManually__btn }
                  >Далее</Button>
               </Form> }
         </Formik>

      </div>
   )
}

export default OrderManuallyStep3