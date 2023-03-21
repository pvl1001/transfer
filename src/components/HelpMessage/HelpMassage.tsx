import s from './HelpMessage.module.scss'
import { FC, PropsWithChildren } from "react";


type TProps = {
   theme: string
}


const HelpMassage: FC<PropsWithChildren<TProps>> = ( { children, theme } ) => {
   const propClass = theme === 'done'
      ? s.HelpMassage_done
      : s.HelpMassage_warning

   return (
      <div className={ `${ s.HelpMassage } ${ propClass }` }>
         <div className={ s.HelpMassage__image }>
            <div className={ s.HelpMassage__icon }/>
         </div>
         <p className={ s.HelpMassage__text }>{ children }</p>
      </div>
   )
}


export default HelpMassage