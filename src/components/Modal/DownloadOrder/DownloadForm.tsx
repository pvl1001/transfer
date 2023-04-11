import s from "./DownloadOrder.module.scss";
import { Field, Form, Formik } from "formik";
import DownloadDatepicker from "./DownloadDatepicker";
import { Button, Select } from "@megafon/ui-core";
import { utils, writeFile } from 'xlsx';
import axios from "axios";
import { BASE_URL } from "../../../utils/api";
import { useState } from "react";

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

   // выгрузить в exel
   async function download( data: TFormData ) {
      const dateTo = date.to || new Date()
      const { responsible, author, transfer } = data

      const path = `${ BASE_URL }/orders/xlsx?transfer=${ transfer }&author=${ author }&responsible=${ responsible }` +
         (date.from ? `&dateFrom=${ date.from }&dateTo=${ dateTo }` : '')

      const { data: orders } = await axios( path )

      const wb = utils.book_new()
      const ws = utils.json_to_sheet( orders )

      utils.book_append_sheet( wb, ws )
      if ( orders.length ) writeFile( wb, 'Заявки.xlsx' )
      else alert( 'Список пуст' )
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
               <Button actionType="submit" className={ s.btn_submit }>
                  Выгрузить
               </Button>

            </Form>
         }
      </Formik>
   )
}

export default DownloadForm