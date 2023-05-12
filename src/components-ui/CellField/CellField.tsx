import { TextField } from "@megafon/ui-core";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import s from './CellField.module.scss'

type TCellField = {
   value: string
   label: string
   onChange: ( e: ChangeEvent<HTMLElement> ) => void
   onBlur: () => void
   disabled: boolean
}

function CellField( { value, label, onChange, onBlur, disabled }: TCellField ) {
   const [ focus, setFocus ] = useState( false )
   const test = useRef<HTMLInputElement | undefined>()

   function onFocus() {
      setFocus( true )
   }

   function onBlurHandler() {
      onBlur()
      setTimeout( () => setFocus( false ), 100 )
   }

   function onChangeHandler( e: ChangeEvent<HTMLElement> ) {
      onChange( e )
      !focus && onFocus()
   }

   function onKeyUp( e: KeyboardEvent<HTMLElement> ) {
      if ( e.key === 'Enter' ) (e.target as HTMLInputElement).blur()
   }


   return (
      <TextField
         className={ s._ }
         placeholder={ ' ' }
         value={ value }
         label={ label }
         onChange={ onChangeHandler }
         onBlur={ onBlurHandler }
         onFocus={ onFocus }
         hideIcon={ !focus }
         disabled={ disabled }
         onKeyUp={ onKeyUp }
      />
   )
}

export default CellField;
