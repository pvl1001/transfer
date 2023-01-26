import s from './Counter.module.scss'


function Counter( { name, value, setFieldValue } ) {

   function changeHandler( arg ) {
      arg === 'minus'
         ? setFieldValue( name, --value )
         : setFieldValue( name, ++value )
   }


   return (
      <div className={ s.Counter }>
         <button
            type="button"
            className={ s.Counter__minus }
            disabled={ value <= 1 }
            onClick={ () => changeHandler( 'minus' ) }>
            &minus;
         </button>
         <input type="number" readOnly value={ value }/>
         <button
            type="button"
            className={ s.Counter__plus }
            disabled={ value >= 10 }
            onClick={ () => changeHandler( 'plus' ) }>
            +
         </button>
      </div>
   )
}


export default Counter