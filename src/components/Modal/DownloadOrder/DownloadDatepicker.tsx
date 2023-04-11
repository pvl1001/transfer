import s from './DownloadOrder.module.scss'
import { useEffect, useState } from 'react'
import { Calendar } from "@megafon/ui-core";
import ModalOverlay from "../ModalOverlay/ModalOverlay";


type TDownloadDatepicker = {
   date: Record<string, Date | null>,
   setDate: ( date: Record<string, Date | null> ) => void
}

function DownloadDatepicker( { date, setDate }: TDownloadDatepicker ) {
   const [ isVisible, setIsVisible ] = useState( false )


   function formatDate( date: Date | null ) {
      return date?.toLocaleString( 'ru', { day: 'numeric', month: 'long', } ) ?? null
   }

   const onChange = ( currentStartDate: Date | null, currentEndDate: Date | null ) => {
      setDate( {
         from: currentStartDate,
         to: currentEndDate
      } )
   }

   function openDatepicker() {
      setIsVisible( true )
   }

   function closeDatepicker() {
      setIsVisible( false )
   }

   // useEffect( () => {
   //    console.log( { from, to } )
   // }, [ from, to ] )


   return (
      <div className={ s.downloadDatepicker }>
         <i className={ s.calendarIcon }/>
         Выберите период: с <span className={ 'link' }
                                  onClick={ openDatepicker }>{ formatDate( date.from ) || 'не указано' }</span> по <span
         className={ 'link' } onClick={ openDatepicker }>{ formatDate( date.to ) || 'не указано' }</span>

         { isVisible && <>
            <ModalOverlay transparent onClose={ closeDatepicker }/>
            <Calendar className={ s.calendar } onChange={ onChange }/>
         </> }
      </div>
   )
}

export default DownloadDatepicker