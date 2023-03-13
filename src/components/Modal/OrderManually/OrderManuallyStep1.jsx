import s from "../OrderManually/OrderManually.module.scss"
import { Field, Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { setOrderData } from "../../../redux/slices/orderSlice";
import Range from "../../../components-ui/Range/Range";
import { Button, Select, TextField } from "@megafon/ui-core";
import { validateError } from "../../../utils/helpers/validate";


const fields = [
   {
      type: 'text',
      name: 'CCMP',
      label: 'Номер CCMP',
   },
   {
      type: 'text',
      name: 'CRM',
      label: 'Номер CRM',
   },
   {
      type: 'text',
      name: 'MSISND',
      label: 'MSISND',
   },
]


function OrderManuallyStep1() {
   const dispatch = useDispatch()
   const {
      CCMP,
      CRM,
      MSISND,
      agreement,
      transfer,
   } = useSelector( store => store.order.data)

   const errorMessage = 'ошибка!'
   const validationSchema = object().shape( {
      // phone: string().min( 16, errorMessage ).required( errorMessage ),
      CCMP: string().min( 2, errorMessage ).required( errorMessage ),
      CRM: string().min( 2, errorMessage ).required( errorMessage ),
      MSISND: string().min( 2, errorMessage ).required( errorMessage ),
      agreement: string().min( 2, errorMessage ).required( errorMessage ),
      transfer: string().min( 2, errorMessage ).required( errorMessage ),
   } )

   function submitHandler( data ) {
      dispatch( setOrderData( data ) )
   }


   return (
      <div className={ s.OrderManually }>

         <Range className={ s.OrderManually__range }/>
         <Formik
            initialValues={ {
               CCMP,
               CRM,
               MSISND,
               agreement,
               transfer,
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
                  <div className={ s.OrderManually__form_container }>
                     <fieldset>
                        { fields.map( ( { type, name, label } ) =>
                           <Field
                              key={ name }
                              as={ TextField }
                              required
                              hidePlaceholder
                              type={ type }
                              name={ name }
                              label={ label }
                              verification={ validateError( errors[name], touched[name], dirty ) }
                           />
                        ) }
                     </fieldset>
                     <fieldset>
                        <Field
                           className={ s.OrderManually__select }
                           as={ Select }
                           required
                           name="agreement"
                           label={ 'Согласование' }
                           items={ [
                              { title: 'Согласовано', value: 'Согласовано' },
                              { title: 'Не согласованно', value: 'Не согласованно' } ] }
                           onSelect={ ( e, { value } ) => setFieldValue( 'agreement', value ) }
                           currentValue={ values.agreement }
                           verification={ validateError( errors['agreement'], touched['agreement'], dirty ) }
                        />
                        <Field
                           className={ s.OrderManually__select }
                           as={ Select }
                           required
                           name="transfer"
                           label={ 'Что переносим' }
                           items={ [
                              { title: 'ТВ', value: 'ТВ' },
                              { title: 'И ещё', value: 'И ещё' } ] }
                           onSelect={ ( e, { value } ) => setFieldValue( 'transfer', value ) }
                           currentValue={ values.transfer }
                           verification={ validateError( errors['transfer'], touched['transfer'], dirty ) }
                        />
                     </fieldset>
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

export default OrderManuallyStep1