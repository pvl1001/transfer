import s from "../OrderManually/OrderManually.module.scss"
import { Field, Form, Formik } from "formik"
import { object, string } from "yup";
import { setOrderData } from "../../../redux/slices/orderSlice";
import Range from "../../../components-ui/Range/Range";
import { Button, Select } from "@megafon/ui-core";
import { validateError } from "../../../utils/helpers/validate";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { TOrderFormStep3 } from "../../../utils/types";


function OrderManuallyStep3() {
   const dispatch = useAppDispatch()
   const {
      ex_seller,
      next_seller,
   } = useAppSelector( store => store.order.data as TOrderFormStep3 )

   const errorMessage = 'ошибка!'
   const validationSchema = object().shape( {
      ex_seller: string().min( 2, errorMessage ).required( errorMessage ),
      next_seller: string().min( 2, errorMessage ).required( errorMessage ),
   } )

   function submitHandler( data: TOrderFormStep3 ) {
      dispatch( setOrderData( data ) )
   }


   return (
      <div className={ s.OrderManually }>

         <Range className={ s.OrderManually__range } range={ 90 }/>
         <Formik
            initialValues={ {
               ex_seller,
               next_seller,
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
                        name="ex_seller"
                        label={ 'Бывший продавец' }
                        items={ [
                           { title: 'Вася', value: 'Вася' },
                           { title: 'Петя', value: 'Петя' }
                        ] }
                        className={ s.OrderManually__select }
                        onSelect={ ( e: Event, { value }: { value: string } ) => setFieldValue( 'ex_seller', value ) }
                        currentValue={ values.ex_seller }
                        verification={ validateError( errors['ex_seller'], touched['ex_seller'], dirty ) }
                     />
                     <Field
                        as={ Select }
                        required
                        name="next_seller"
                        label={ 'Будущий продавец' }
                        items={ [
                           { title: 'Вася', value: 'Вася' },
                           { title: 'Петя', value: 'Петя' }
                        ] }
                        className={ s.OrderManually__select }
                        onSelect={ ( e: Event, { value }: { value: string } ) => setFieldValue( 'next_seller', value ) }
                        currentValue={ values.next_seller }
                        verification={ validateError( errors['next_seller'], touched['next_seller'], dirty ) }
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