import s from "./DownloadOrder.module.scss";
import { Field, Form, Formik } from "formik";
import DownloadDatepicker from "./DownloadDatepicker";
import { Button, Select } from "@megafon/ui-core";

const selectItems = [
   {
      title: 'Вася',
      value: 'Вася'
   },
   {
      title: 'Петя',
      value: 'Петя'
   }
]


type TFormData = {
   author: string
   serviceType: string
   responsible: string
}

function DownloadForm() {
   function submitHandler( data: TFormData ) {
      console.log( data )
   }


   return (
      <Formik
         initialValues={ {
            author: '',
            serviceType: '',
            responsible: '',
         } }
         onSubmit={ submitHandler }>
         { ( { setFieldValue, values } ) =>
            <Form className={ s.form }>
               <fieldset>
                  <Field
                     as={ Select }
                     name="author"
                     label={ 'Автор обращения на перенос' }
                     items={ selectItems }
                     onSelect={ ( e: Event, { value }: { value: string } ) => setFieldValue( 'author', value ) }
                     currentValue={ values.author }
                  />
                  <Field
                     as={ Select }
                     name="serviceType"
                     label={ 'Тип услуги' }
                     items={ selectItems }
                     onSelect={ ( e: Event, { value }: { value: string } ) => setFieldValue( 'serviceType', value ) }
                     currentValue={ values.serviceType }
                  />
                  <Field
                     as={ Select }
                     name="responsible"
                     placeholder={ 'Ответственный' }
                     items={ selectItems }
                     onSelect={ ( e: Event, { value }: { value: string } ) => setFieldValue( 'responsible', value ) }
                     currentValue={ values.responsible }
                  />

                  <DownloadDatepicker/>

               </fieldset>
               <Button actionType="submit" className={ s.btn_submit }>
                  Выгрузить
               </Button>

            </Form>
         }
      </Formik>
   )
}

export default DownloadForm