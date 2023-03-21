import s from './DeleteRequest.module.scss';
import { Button } from "@megafon/ui-core";
import { FC } from "react";


type TProps = {
   closeModal: () => void
}


const DeleteRequest: FC<TProps> = ( { closeModal } ) => {
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