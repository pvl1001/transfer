import s from "./OrderManually/OrderManually.module.scss";


function WithModalTitle( { children, title, description } ) {
   return (
      <>
         <div className={ s.OrderManually__title_container }>
            <h2 className={ s.OrderManually__title }>{ title }</h2>
            { description &&
               <p className={ s.OrderManually__description }
                  dangerouslySetInnerHTML={ { __html: description } }/> }
         </div>
         { children }
      </>
   )
}


export default WithModalTitle