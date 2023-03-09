import s from './DeletePanel.module.scss';
import { Button } from "@megafon/ui-core";
import { ReactComponent as Icon } from '@megafon/ui-icons/system-16-cancel_16.svg';


function DeletePanel({setIsVisibleDeletePanel}) {

   function cancel() {
      setIsVisibleDeletePanel(false)
   }

   return (
      <div className={ s._ }>
         <div className={ s.wrapper + " wrapper" }>

            <p>Вы точно хотите удалить выбранные заявки?</p>

            <div className={ s.btns }>
               <Button theme={ 'white' } onClick={ cancel }>
                  Отменить
               </Button>

               <Button theme={ 'purple' }>
                  Удалить
               </Button>

               <button type={ 'button' } className={ s.close_btn } onClick={ cancel }>
                  <Icon/>
               </button>
            </div>
         </div>
      </div>
   )
}


export default DeletePanel;