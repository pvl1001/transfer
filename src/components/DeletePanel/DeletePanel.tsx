import s from './DeletePanel.module.scss';
import { Button } from "@megafon/ui-core";
import { ReactComponent as Icon } from '@megafon/ui-icons/system-16-cancel_16.svg';
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import WithModalTitle from "../Modal/WithModalTitle/WithModalTitle";
import DeleteRequest from "../Modal/DeleteRequest/DeleteRequest";
import React, { FC } from "react";


type TProps = {
   setIsVisibleDeletePanel: ( isVisibleDeletePanel: boolean ) => void
   thunkDelete: () => void
}

const DeletePanel: FC<TProps> = ( { setIsVisibleDeletePanel, thunkDelete } ) => {
   const { visible, closeModal, showModal } = useModal()

   function cancel() {
      setIsVisibleDeletePanel( false )
   }


   return (
      <div className={ s._ }>
         <div className={ s.wrapper + " wrapper" }>

            <p>Вы точно хотите удалить выбранные заявки?</p>

            <div className={ s.btns }>
               <Button theme={ 'white' } onClick={ cancel }>
                  Отменить
               </Button>
               <Button theme={ 'purple' } onClick={ showModal }>
                  Удалить
               </Button>

               <button type={ 'button' } className={ s.close_btn } onClick={ cancel }>
                  <Icon/>
               </button>
            </div>
         </div>

         { visible &&
            <Modal onClose={ closeModal }>
               <WithModalTitle
                  title={ 'Подтвердите удаление' }
                  description={ 'Нам необходимо убедиться, что это не случайность' }
               >
                  <DeleteRequest thunkDelete={ thunkDelete } closeModal={ closeModal }/>
               </WithModalTitle>
            </Modal>
         }

      </div>
   )
}


export default DeletePanel;