import s from "./DownloadOrder.module.scss";
import { Field, Form, Formik } from "formik";
import Select from "../../../components-ui/Select/Select";
import Button from "../../../components-ui/Button/Button";
import DownloadDatepicker from "./DownloadDatepicker";


function DownloadForm() {
   function submitHandler( data ) {
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
         { ( { setFieldValue } ) =>
            <Form className={ s.form }>
               <fieldset>
                  <Field
                     as={ Select }
                     name="author"
                     placeholder={ 'Автор обращения на перенос' }
                     options={ [ 'Вася', 'Петя' ] }
                     setFieldValue={ setFieldValue }
                  />
                  <Field
                     as={ Select }
                     name="serviceType"
                     placeholder={ 'Тип услуги' }
                     options={ [ 'Вася', 'Петя' ] }
                     setFieldValue={ setFieldValue }
                  />
                  <Field
                     as={ Select }
                     name="responsible"
                     placeholder={ 'Ответственный' }
                     options={ [ 'Вася', 'Петя' ] }
                     setFieldValue={ setFieldValue }
                  />

                  <DownloadDatepicker/>

               </fieldset>

               <Button type="submit" theme={ 'green' } className={ s.btn_submit }>
                  Выгрузить
               </Button>

            </Form>

         }
      </Formik>
   )
}

export default DownloadForm