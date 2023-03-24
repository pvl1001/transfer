import s from './DeleteRequest.module.scss';
import { Button } from "@megafon/ui-core";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { thunkDeleteOrder } from "../../../redux/slices/tableOrdersSlice";


type TDeleteRequestProps = {
   closeModal: () => void
}


const DeleteRequest: FC<TDeleteRequestProps> = ( { closeModal } ) => {
   const { selectedId } = useAppSelector( state => state.tableOrders )
   const dispatch = useAppDispatch()

   async function deleteOrder() {
      await dispatch( thunkDeleteOrder( selectedId ) )
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
            onClick={ deleteOrder }
         >Да, удалить</Button>
      </div>
   )
}


export default DeleteRequest;