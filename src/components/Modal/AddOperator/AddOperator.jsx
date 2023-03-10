import s from './AddOperator.module.scss';
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { Button, Select, TextField } from "@megafon/ui-core";
import { validateError } from "../../../utils/helpers/validate";


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

function AddOperator( { setSuccess } ) {
   const validationSchema = object().shape( {
      name: string().min( 2 ).required(),
      surname: string().min( 2 ).required(),
      company: string().required(),
      department: string().required(),
   } )

   function submitHandler( data ) {
      console.log( data )
      setSuccess( true )
   }


   return (
      <div className={ s._ }>
         <Formik
            initialValues={ {
               name: '',
               surname: '',
               company: '',
               department: '',
            } }
            validateOnBlur
            validationSchema={ validationSchema }
            onSubmit={ submitHandler }>
            { ( {
                   errors,
                   touched,
                   dirty,
                   setFieldValue,
                   values
                } ) =>
               <Form className={ s.form }>
                  <fieldset className={ s.fieldset }>
                     <Field
                        as={ TextField }
                        required
                        hidePlaceholder
                        type="text"
                        name="name"
                        label={ 'Имя' }
                        verification={ validateError( errors['name'], touched['name'], dirty ) }
                     />
                     <Field
                        as={ TextField }
                        required
                        hidePlaceholder
                        name="surname"
                        label={ 'Фамилия' }
                        verification={ validateError( errors['surname'], touched['surname'], dirty ) }
                     />
                     <Field
                        as={ Select }
                        required
                        name="company"
                        label={ 'Компания' }
                        items={ selectItems }
                        onSelect={ ( e, { value } ) => setFieldValue( 'company', value ) }
                        currentValue={ values.company }
                        verification={ validateError( errors['company'], touched['company'], dirty ) }
                     />
                     <Field
                        as={ Select }
                        required
                        name="department"
                        label={ 'Отдел' }
                        items={ selectItems }
                        onSelect={ ( e, { value } ) => setFieldValue( 'department', value ) }
                        currentValue={ values.department }
                        verification={ validateError( errors['department'], touched['department'], dirty ) }
                     />
                  </fieldset>

                  <Button actionType="submit" className={ s.btn_submit }>
                     Добавить
                  </Button>

               </Form>
            }
         </Formik>
      </div>
   )
}


export default AddOperator;