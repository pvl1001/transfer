import s from './Button.module.scss'


function Button( { children, className, theme, ...props } ) {
   const propClass = s['Button_' + theme]

   return (
      <button
         type="button"
         className={ `${ s.Button } ${ propClass } ${ className }` }
         { ...props }
      >
         { children }
      </button>
   )
}


export default Button