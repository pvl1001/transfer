import s from "../OrderManually/OrderManually.module.scss"
import { Field, Form, Formik } from "formik"
import { object, string } from "yup";
import { setOrderData } from "../../../redux/slices/orderSlice";
import Range from "../../../components-ui/Range/Range";
import { Button, Select, TextField } from "@megafon/ui-core";
import { validateError } from "../../../utils/helpers/validate";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { TOrderFormStep1 } from "../../../utils/types";

type TField = {
   type: string,
   name: string,
   label: string,
}

const fields: Array<TField> = [
   {
      type: 'text',
      name: 'ccmp',
      label: 'Номер CCMP',
   },
   {
      type: 'text',
      name: 'crm',
      label: 'Номер CRM',
   },
   {
      type: 'text',
      name: 'msisnd',
      label: 'MSISND',
   },
]


function OrderManuallyStep1() {
   const dispatch = useAppDispatch()
   const { user } = useAppSelector( state => state.auth )
   const {
      ccmp,
      crm,
      msisnd,
      status,
      transfer,
   } = useAppSelector( store => store.order.data as TOrderFormStep1 )

   const errorMessage = 'ошибка!'
   const validationSchema = object().shape( {
      ccmp: string().min( 2, errorMessage ).required( errorMessage ),
      crm: string().min( 2, errorMessage ).required( errorMessage ),
      msisnd: string().min( 2, errorMessage ).required( errorMessage ),
      status: string().min( 2, errorMessage ).required( errorMessage ),
      transfer: string().min( 2, errorMessage ).required( errorMessage ),
   } )

   function submitHandler( data: TOrderFormStep1 ) {
      dispatch( setOrderData( {
         ...data,
         author: user.name
      } ) )
   }


   return (
      <div className={ s.OrderManually }>

         <Range className={ s.OrderManually__range }/>
         <Formik
            initialValues={ {
               ccmp,
               crm,
               msisnd,
               status,
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
                              verification={ validateError( errors[name as keyof boolean], touched[name as keyof boolean], dirty ) }
                           />
                        ) }
                     </fieldset>
                     <fieldset>
                        <Field
                           className={ s.OrderManually__select }
                           as={ Select }
                           required
                           name="status"
                           label={ 'Согласование' }
                           items={ [
                              { title: 'Согласовано', value: 'Согласовано' },
                              { title: 'Не согласовано', value: 'Не согласовано' }
                           ] }
                           onSelect={ ( e: Event, { value }: { value: string } ) => setFieldValue( 'status', value ) }
                           currentValue={ values.status }
                           verification={ validateError( errors['status'], touched['status'], dirty ) }
                        />
                        <Field
                           className={ s.OrderManually__select }
                           as={ Select }
                           required
                           name="transfer"
                           label={ 'Что переносим' }
                           items={ [
                              { title: 'ТВ', value: 'ТВ' },
                              { title: 'И ещё', value: 'И ещё' }
                           ] }
                           onSelect={ ( e: Event, { value }: { value: string } ) => setFieldValue( 'transfer', value ) }
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