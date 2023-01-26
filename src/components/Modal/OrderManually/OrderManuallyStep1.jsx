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


const fields = [
   {
      type: 'number',
      name: 'CCMP',
      label: 'Номер CCMP',
   },
   {
      type: 'number',
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
               CCMP: '',
               CRM: '',
               MSISND: '',
               agreement: '',
               transfer: ''
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
                  <div className={ s.OrderManually__form_container }>
                     <fieldset>
                        { fields.map( ( { type, name, label } ) =>
                           <Field
                              key={ name }
                              as={ Input }
                              type={ type }
                              name={ name }
                              label={ label }
                              setFieldValue={ setFieldValue }
                              classValid={ onValidHelper( errors[name], touched[name], dirty ) }
                           />
                        ) }
                     </fieldset>
                     <fieldset>
                        <Field
                           as={ Select }
                           name="agreement"
                           placeholder={ 'Согласование' }
                           options={ [ 'Согласовано', 'Не согласованно' ] }
                           className={ s.OrderManually__select }
                           setFieldValue={ setFieldValue }
                           classValid={ onValidHelper( errors['agreement'], touched['agreement'], dirty ) }
                        />
                        <Field
                           as={ Select }
                           name="transfer"
                           placeholder={ 'Что переносим' }
                           options={ [ 'ТВ', 'И еще' ] }
                           className={ s.OrderManually__select }
                           setFieldValue={ setFieldValue }
                           classValid={ onValidHelper( errors['transfer'], touched['transfer'], dirty ) }
                        />
                     </fieldset>
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

export default OrderManuallyStep1