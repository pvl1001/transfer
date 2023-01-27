import React from 'react'
import s from './CellSelect.module.scss'
import cellStyle from "@/components/CellInput/CellInput.module.scss"


function CellSelect( { CellTitle, options, onBlur } ) {
   const [ value, setValue ] = React.useState( 'test' )
   const [ isOpen, setIsOpen ] = React.useState( false )
   const classOpen = isOpen ? s.CellSelect__open : ''


   function handleChange( e ) {
      setValue( e.target.textContent )
   }

   function open() {
      setIsOpen( true )
   }

   React.useEffect( () => {
      if ( !isOpen ) onBlur()
   }, [ isOpen ] )

   function onBlurHandler() {
      setIsOpen( false )
   }


   return (
      <div className={ `${ cellStyle.CellInput } ${ s.CellSelect }` }>
         <p className={ cellStyle.CellInput__cell_title }>{ CellTitle }</p>

         <div className={ `${ cellStyle.CellInput__input } ${ classOpen }` }>
            <div className={ s.CellSelect__icon }/>
            <input
               readOnly
               value={ value }
               onBlur={ onBlurHandler }
               onClick={ open }
            />
            <ul className={ s.CellSelect__list }>
               { options.map( val =>
                  <li
                     key={ val }
                     className={ s.CellSelect__item }
                     onMouseDown={ handleChange }
                  >{ val }</li>
               ) }
            </ul>
         </div>
      </div>
   )
}


export default CellSelect