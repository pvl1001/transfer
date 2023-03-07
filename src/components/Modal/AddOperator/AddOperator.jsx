import s from './AddOperator.module.scss';
import { Field, Form, Formik } from "formik";
import Select from "../../../components-ui/Select/Select";
import Button from "../../../components-ui/Button/Button";
import Input from "../../../components-ui/Input/Input";
import { object, string } from "yup";
import onValidHelper from "../../../utils/helpers/onValidHelper";


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
                } ) =>
               <Form className={ s.form }>
                  <fieldset className={ s.fieldset }>
                     <Field
                        as={ Input }
                        name="name"
                        label={ 'Имя' }
                        setFieldValue={ setFieldValue }
                        classValid={ onValidHelper( errors['name'], touched['name'], dirty ) }

                     />
                     <Field
                        as={ Input }
                        name="surname"
                        label={ 'Фамилия' }
                        setFieldValue={ setFieldValue }
                        classValid={ onValidHelper( errors['surname'], touched['surname'], dirty ) }
                     />
                     <Field
                        as={ Select }
                        required
                        name="company"
                        placeholder={ 'Компания' }
                        options={ [ 'Вася', 'Петя' ] }
                        setFieldValue={ setFieldValue }
                        classValid={ onValidHelper( errors['company'], touched['company'], dirty ) }
                     />
                     <Field
                        as={ Select }
                        required
                        name="department"
                        placeholder={ 'Отдел' }
                        options={ [ 'Вася', 'Петя' ] }
                        setFieldValue={ setFieldValue }
                        classValid={ onValidHelper( errors['department'], touched['department'], dirty ) }
                     />
                  </fieldset>

                  <Button type="submit" theme={ 'green' } className={ s.btn_submit }>
                     Добавить
                  </Button>

               </Form>
            }
         </Formik>
      </div>
   )
}


export default AddOperator;