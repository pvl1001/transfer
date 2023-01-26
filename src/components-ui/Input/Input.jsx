import s from './Input.module.scss'
import { useState } from "react";


function Input( props ) {
   const {
      id = '',
      type,
      name,
      label,
      value,
      onChange,
      onFocus,
      onBlur,
      className = '',
      classValid,
      setFieldValue,
      addressValue,
      resetForm,
      disabled,
   } = props

   const [ isFocus, setIsFocus ] = useState( false )
   const isValid = classValid === 'valid'
   const isError = classValid === 'error'
   const hidden = !isFocus && !isError
   const classFocus = isFocus ? ' ' + s.Input__focus : ''
   const classNotEmpty = value || addressValue ? s.Input__not_empty : ''
   // const classValid = isError ? ' ' + s.Input__error
   //    : isValid ? ` ${ s.Input__valid }` : ''


   function focusHandler( e ) {
      onFocus && onFocus( e )
      setIsFocus( true )
      // name === 'phone' ? e.target.placeholder = '+7(   )   -  -  ' : ''
   }

   function blurHandler( e ) {
      setIsFocus( false )
      onBlur && onBlur( e )
      // name === 'phone' ? e.target.placeholder = '' : ''
   }

   function clearValue( e ) {
      e.preventDefault()
      if ( setFieldValue ) return setFieldValue( name, '' )
      resetForm()
   }


   return (
      <div className={ `${ s.Input } ${ className }` }>
         <div className={ s.Input__container }>
            { isValid && !isFocus && <div className={ s.Input__check }/> }
            <input
               id={ id }
               type={ type }
               name={ name }
               value={ value }
               onInput={ onChange }
               onFocus={ focusHandler }
               onBlur={ blurHandler }
               className={ `input ${ classNotEmpty } ${ classValid ? s['Input__' + classValid] : '' }` }
               disabled={ disabled }
            />
            <label>{ label }</label>
            <button
               type="button"
               onMouseDown={ clearValue }
               hidden={ hidden }
               className={ s.Input__clear_btn + classFocus }
            ></button>
         </div>
      </div>
   )

}

export default Input