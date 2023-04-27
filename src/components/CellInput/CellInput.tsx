import { ChangeEvent, FC, KeyboardEvent, SyntheticEvent, useState } from "react";
import s from './CellInput.module.scss'
import moment from "moment";


type TCellInputProps = {
   onClear: ( e: SyntheticEvent ) => void
   onBlur: () => void
   CellTitle: string
   value: string
   onChange?: ( e: ChangeEvent<HTMLInputElement> ) => void
   disabled?: boolean
}


const CellInput: FC<TCellInputProps> = ( { onClear, onBlur, CellTitle, ...props } ) => {
   const [ isHidden, setIsHidden ] = useState( true )


   function onFocusHandler() {
      setIsHidden( prev => !prev )
   }

   function onBlurHandler() {
      onBlur()
      setIsHidden( prev => !prev )
   }

   function filterValue( value: string ) {
      if ( CellTitle === 'Дата и время' ) {
         return moment( value ).format( 'DD.MM - HH:mm' )
      }
      return value
   }

   function onKeyDown( e: KeyboardEvent<HTMLInputElement> ) {
      if ( e.key === 'Enter' ) (e.target as HTMLInputElement).blur()
   }


   return (
      <div className={ s.CellInput }>
         <p className={ s.CellInput__cell_title }>{ CellTitle }</p>
         <input
            { ...props }
            value={ filterValue( props.value ) }
            className={ s.CellInput__input }
            onFocus={ onFocusHandler }
            onBlur={ onBlurHandler }
            onKeyDown={ onKeyDown }
         />
         <button
            hidden={ isHidden }
            onMouseDown={ onClear }
         />
      </div>
   )
}


export default CellInput