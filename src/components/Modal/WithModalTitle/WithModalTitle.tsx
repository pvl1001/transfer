import s from "./WithModalTitle.module.scss";
import { FC, PropsWithChildren } from "react";



type TProps = {
   title: string
   description?: string
}

const WithModalTitle: FC<PropsWithChildren<TProps>> = ( { children, title, description } ) => {
   return (
      <>
         <div className={ s.container }>
            <h2>{ title }</h2>
            { description &&
               <p className={ s.description }
                  dangerouslySetInnerHTML={ { __html: description } }/> }
         </div>
         { children }
      </>
   )
}


export default WithModalTitle