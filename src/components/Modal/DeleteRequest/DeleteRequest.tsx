import s from './DeleteRequest.module.scss';
import { Button } from "@megafon/ui-core";
import { FC } from "react";
import { useAppSelector } from "../../../redux/store";
import useAlert from "../../../hooks/useAlert";
import { Thunk } from "yup/es/util/types";


type TDeleteRequestProps = {
   closeModal: () => Promise<void>
   thunkDelete: () => Thunk<any>
}


const DeleteRequest: FC<TDeleteRequestProps> = ( { closeModal, thunkDelete } ) => {
   const { alertSuccess } = useAlert()
   const { isLoading } = useAppSelector( state => ({
      isLoading: state.tableOperators.status === 'loading' || state.tableOrders.status === 'loading'
   }) )

   async function deleteItems(): Promise<void> {
      const res = await thunkDelete()
      await closeModal()
      if ( !res.error ) alertSuccess( 'Удалено!' )
   }


   return (
      <div className={ s._ }>
         {/*@ts-ignore*/ }
         <Button
            type="outline"
            theme={ 'black' }
            onClick={ closeModal }
         >Не надо</Button>
         {/*@ts-ignore*/ }
         <Button
            className={ s.red_btn }
            onClick={ deleteItems }
            showLoader={ isLoading }
            disabled={ isLoading }
         >Да, удалить</Button>
      </div>
   )
}


export default DeleteRequest;