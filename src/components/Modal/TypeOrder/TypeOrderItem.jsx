import s from "./TypeOrder.module.scss"


function TypeOrderItem( { data, onClick } ) {
   const { id, img, name, description } = data

   return (
      <div className={ s.TypeOrder__item } onClick={ () => onClick( id ) }>
         <img
            className={ s.TypeOrder__image }
            src={ img }
            alt={ id }
            height={ 144 }
         />
         <h5 className={ s.TypeOrder__name }>{ name }</h5>
         <p>{ description }</p>
      </div>
   )
}


export default TypeOrderItem