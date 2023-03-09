import s from './Login.module.scss';
import { Logo } from "@megafon/ui-core";
import { ReactComponent as EditIcon } from '@megafon/ui-icons/basic-24-edit_24.svg';
import { ReactComponent as UploadIcon } from '@megafon/ui-icons/basic-24-upload_24.svg';
import { ReactComponent as ServicesIcon } from '@megafon/ui-icons/basic-24-services_24.svg';


function LoginGreenBox() {
   return (
      <article className={ s._ }>
         <div>
            <Logo className={ s.logo } target={ '_self' } href={ '/login' }/>
         </div>
         <div>
            <h1>Удобный <br/>
               и простой <br/>
               перенос заявок
            </h1>

            <ul className={ s.item_list }>

               <li className={ s.item }>
                  <div className={ s.item__icon }>
                     <EditIcon width={ 32 }/>
                  </div>
                  <p>Быстро создавайте заявку с переносом нужных данных.</p>
               </li>

               <li className={ s.item }>
                  <div className={ s.item__icon }>
                     <UploadIcon width={ 32 }/>
                  </div>
                  <p>Импортируйте файлы, чтобы загрузить много заявок сразу.</p>
               </li>

               <li className={ s.item }>
                  <div className={ s.item__icon }>
                     <ServicesIcon width={ 32 }/>
                  </div>
                  <p>Управляйте операторами и другими сотрудниками. Задавайте им роли, а также удаляйте из системы при
                     необходимости.</p>
               </li>
            </ul>
         </div>
      </article>
   )
}


export default LoginGreenBox;