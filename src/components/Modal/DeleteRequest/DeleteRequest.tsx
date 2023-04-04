import s from './DeleteRequest.module.scss';
import { Button } from "@megafon/ui-core";
import { FC } from "react";
import { useAppDispatch } from "../../../redux/store";


type TDeleteRequestProps = {
   closeModal: () => void
   thunkDelete: () => any
}


const DeleteRequest: FC<TDeleteRequestProps> = ( { closeModal, thunkDelete } ) => {
   const dispatch = useAppDispatch()

   async function deleteItems() {
      await dispatch( thunkDelete() )
      closeModal()
   }


   return (
      <div className={ s._ }>
         <Button
            type="outline"
            theme={ 'black' }
            onClick={ closeModal }
         >Не надо</Button>
         <Button
            className={ s.red_btn }
            onClick={ deleteItems }
         >Да, удалить</Button>
      </div>
   )
}


export default DeleteRequest;