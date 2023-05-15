import s from "./DownloadOrder.module.scss";
import { Field, Form, Formik } from "formik";
import DownloadDatepicker from "./DownloadDatepicker";
import { Button, Select } from "@megafon/ui-core";
import { request } from "../../../utils/api";
import { useState } from "react";
import downloadExel from "../../../utils/helpers/downloadExel";
import useAlert from "../../../hooks/useAlert";

const selectItems = [
   {
      title: '1',
      value: '1'
   },
   {
      title: '2',
      value: '2'
   },
   {
      title: '3',
      value: '3'
   }
]


type TFormData = {
   author: string
   transfer: string
   responsible: string
}

function DownloadForm() {
   const [ date, setDate ] = useState<Record<string, Date | null>>( { from: null, to: null } )
   const { alertWarning } = useAlert()

   // выгрузить в exel
   async function download( data: TFormData ) {
      const dateTo = date.to || new Date()
      const { responsible, author, transfer } = data

      const { data: orders } = await request( `orders/xlsx?transfer=${ transfer }&author=${ author }&responsible=${ responsible }` +
         (date.from ? `&dateFrom=${ date.from }&dateTo=${ dateTo }` : '') )

      downloadExel( orders, 'Заявки.xlsx', alertWarning )
   }


   return (
      <Formik
         initialValues={ {
            author: '',
            transfer: '',
            responsible: '',
         } }
         onSubmit={ download }>
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
                     name="transfer"
                     label={ 'Тип услуги' }
                     items={ selectItems }
                     onSelect={ ( e: Event, { value }: { value: string } ) => setFieldValue( 'transfer', value ) }
                     currentValue={ values.transfer }
                  />
                  <Field
                     as={ Select }
                     name="responsible"
                     placeholder={ 'Ответственный' }
                     items={ selectItems }
                     onSelect={ ( e: Event, { value }: { value: string } ) => setFieldValue( 'responsible', value ) }
                     currentValue={ values.responsible }
                  />

                  <DownloadDatepicker date={ date } setDate={ setDate }/>

               </fieldset>
               {/* @ts-ignore */ }
               <Button actionType="submit" className={ s.btn_submit }>
                  Выгрузить
               </Button>

            </Form>
         }
      </Formik>
   )
}

export default DownloadForm