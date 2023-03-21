import s from './DownloadOrder.module.scss'
import { useState } from 'react'
import { Calendar } from "@megafon/ui-core";
import ModalOverlay from "../ModalOverlay/ModalOverlay";


function DownloadDatepicker() {
   const [ isVisible, setIsVisible ] = useState( false )
   const [ from, setFrom ] = useState<string | null>( null )
   const [ to, setTo ] = useState<string | null>( null )

   function formatDate( date: Date | null ) {
      return date?.toLocaleString( 'ru', { day: 'numeric', month: 'long', } ) ?? null
   }

   const onChange = ( currentStartDate: Date | null, currentEndDate: Date | null ) => {
      setFrom( formatDate( currentStartDate ) )
      setTo( currentEndDate ? formatDate( currentEndDate ) : currentEndDate )
   }

   function openDatepicker() {
      setIsVisible( true )
   }

   function closeDatepicker() {
      setIsVisible( false )
   }


   return (
      <div className={ s.downloadDatepicker }>
         <i className={ s.calendarIcon }/>
         Выберите период: с <span className={ 'link' }
                                  onClick={ openDatepicker }>{ from || 'не указано' }</span> по <span
         className={ 'link' } onClick={ openDatepicker }>{ to || 'не указано' }</span>

         { isVisible && <>
            <ModalOverlay transparent onClose={ closeDatepicker }/>
            <Calendar className={ s.calendar } onChange={ onChange }/>
         </> }
      </div>
   )
}

export default DownloadDatepicker