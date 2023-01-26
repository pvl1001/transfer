import s from './Range.module.scss'


function Range( { className = '', range = 0 } ) {
   const style = {
      width: range + '%',
      backgroundColor:
         range < 33 ? '#EB5A40'
            : range < 66 ? '#FFA717'
               : '#00b956'
   }

   return (
      <div className={ className }>
         <p className={ s.Range__labels }>
            <span>{ range }%</span>
            <span>100%</span>
         </p>

         <div className={ s.Range__overlay }>
            <div className={ s.Range__active } style={ style }/>
         </div>
      </div>
   )
}


export default Range
