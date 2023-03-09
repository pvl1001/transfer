import s from './DeleteRequest.module.scss';
import { Button } from "@megafon/ui-core";


function DeleteRequest( { closeModal } ) {
   return (
      <div className={ s._ }>
         <Button
            type="outline"
            theme={ 'black' }
            onClick={ closeModal }
         >Не надо</Button>

         <Button
            className={ s.red_btn }
            onClick={ closeModal }
         >Да, удалить</Button>
      </div>
   )
}


export default DeleteRequest;