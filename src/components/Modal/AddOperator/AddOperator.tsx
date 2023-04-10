import s from './AddOperator.module.scss';
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { Button, Select, TextField } from "@megafon/ui-core";
import { validateError } from "../../../utils/helpers/validate";
import { FC } from "react";
import { thunkGetOperators } from "../../../redux/slices/tableOperatorsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";


const companyItems = [
   {
      title: 'NBN',
      value: 'NBN'
   },
   {
      title: 'МегаФон',
      value: 'МегаФон'
   }
]

const departmentItems = [
   {
      title: 'B2C',
      value: 'B2C'
   },
   {
      title: 'B2B',
      value: 'B2B'
   }
]

const roleItems = [
   {
      title: 'Администратор',
      value: 'Администратор'
   },
   {
      title: 'Старший оператор',
      value: 'Старший оператор'
   },
   {
      title: 'Оператор',
      value: 'Оператор'
   }
]


type TAddOperatorProps = {
   setSuccess: ( success: boolean ) => void
}

type TFormData = {
   name: string
   role: string
   company: string
   department: string
}


const AddOperator: FC<TAddOperatorProps> = ( { setSuccess } ) => {
   const dispatch = useAppDispatch()
   const { tab } = useAppSelector( state => ({
      tab: state.tableOperators.tab.value,
      pagination: state.tableOperators.pagination.current
   }) )

   const validationSchema = object().shape( {
      name: string().min( 2 ).required(),
      role: string().min( 2 ).required(),
      company: string().required(),
      department: string().required(),
   } )

   function submitHandler( data: TFormData ) {
      dispatch( thunkGetOperators( {
         method: 'POST',
         payload: {
            tab,
            row: {
               ...data,
               supervisor: 'Руководитель',
               phone: '+70000000000',
               email: 'test@megafon.ru',
            }
         }
      } ) )
      setSuccess( true )
   }


   return (
      <div className={ s._ }>
         <Formik
            initialValues={ {
               name: '',
               role: '',
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
                        label={ 'ФИО' }
                        verification={ validateError( errors['name'], touched['name'], dirty ) }
                     />
                     <Field
                        as={ Select }
                        required
                        name="role"
                        label={ 'Роль' }
                        items={ roleItems }
                        onSelect={ ( e: Event, { value }: { value: string } ) => setFieldValue( 'role', value ) }
                        currentValue={ values.role }
                        verification={ validateError( errors['role'], touched['role'], dirty ) }
                     />
                     <Field
                        as={ Select }
                        required
                        name="company"
                        label={ 'Компания' }
                        items={ companyItems }
                        onSelect={ ( e: Event, { value }: { value: string } ) => setFieldValue( 'company', value ) }
                        currentValue={ values.company }
                        verification={ validateError( errors['company'], touched['company'], dirty ) }
                     />
                     <Field
                        as={ Select }
                        required
                        name="department"
                        label={ 'Отдел' }
                        items={ departmentItems }
                        onSelect={ ( e: Event, { value }: { value: string } ) => setFieldValue( 'department', value ) }
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