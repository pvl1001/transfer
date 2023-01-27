import s from './Select.module.scss'
import { useState } from 'react'


function Select( props ) {
   const {
      name,
      placeholder,
      onBlur,
      setFieldValue,
      value,
      options,
      className = '',
      classValid,
   } = props

   const [ isOpen, setIsOpen ] = useState( false )
   const classOpen = isOpen ? s.Select__open : ''
   const classActive = value ? s.Select__active : ''

   function handleChange( e ) {
      setFieldValue( name, e.target.textContent )
   }

   function open() {
      setIsOpen( true )
   }

   function onBlurHandler( e ) {
      setIsOpen( false )
      onBlur( e )
   }


   return (
      <div className={ `${ s.Select } ${ classOpen } ${ className } ${ classActive }` }>
         <span className={ `${ s.Select__placeholder }  ` }>{ placeholder }</span>
         <input
            readOnly
            type="text"
            name={ name }
            value={ value }
            onBlur={ onBlurHandler }
            onClick={ open }
            className={ `input ${ classValid ? s['Select__' + classValid] : '' }` }
         />
         <div className={ s.Select__icon }/>

         <ul className={ s.Select__list }>
            { options.map( val =>
               <li
                  key={ val }
                  className={ s.Select__item }
                  onMouseDown={ handleChange }
               >{ val }</li>
            ) }
         </ul>
      </div>
   )
}


export default Select