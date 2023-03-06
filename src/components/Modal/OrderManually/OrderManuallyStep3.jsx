import s from "../OrderManually/OrderManually.module.scss"
import { Field, Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { setOrderData } from "../../../store/slices/orderSlice";
import Range from "../../../components-ui/Range/Range";
import Select from "../../../components-ui/Select/Select";
import onValidHelper from "../../../utils/helpers/onValidHelper";
import Button from "../../../components-ui/Button/Button";


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
                        required
                        name="exSeller"
                        placeholder={ 'Бывший продавец' }
                        options={ [ 'Вася', 'Петя' ] }
                        className={ s.OrderManually__select }
                        setFieldValue={ setFieldValue }
                        classValid={ onValidHelper( errors['exSeller'], touched['exSeller'], dirty ) }
                     />
                     <Field
                        as={ Select }
                        required
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