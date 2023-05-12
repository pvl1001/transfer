import s from './DeletePanel.module.scss';
import { Button } from "@megafon/ui-core";
import { ReactComponent as Icon } from '@megafon/ui-icons/system-16-cancel_16.svg';
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import WithModalTitle from "../Modal/WithModalTitle/WithModalTitle";
import DeleteRequest from "../Modal/DeleteRequest/DeleteRequest";
import { FC, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import OrderSuccess from "../Modal/OrderSuccess/OrderSuccess";


type TProps = {
   cancel: () => void
   thunkDelete: () => void
   show: boolean
   deleteSuccessText: {
      title: string,
      description: string
   }
}

const DeletePanel: FC<TProps> = ( { cancel, thunkDelete, show, deleteSuccessText } ) => {
   const deletePanelRef = useRef( null )
   const { visible, closeModal, showModal } = useModal()
   const isShow = show || visible
   const [ isDelete, setIsDelete ] = useState( false )

   return (
      <CSSTransition
         in={ isShow }
         classNames={ 'delete-panel' }
         timeout={ 200 }
         ref={ deletePanelRef }
         unmountOnExit
      >
         <div className={ s._ }>
            <div className={ s.wrapper + " wrapper" }>

               <p>Вы точно хотите удалить выбранные заявки?</p>

               <div className={ s.btns }>
                  {/*@ts-ignore*/ }
                  <Button theme={ 'white' } onClick={ cancel }>
                     Отменить
                  </Button>
                  {/*@ts-ignore*/ }
                  <Button theme={ 'purple' } onClick={ showModal }>
                     Удалить
                  </Button>

                  <button type={ 'button' } className={ s.close_btn } onClick={ cancel }>
                     <Icon/>
                  </button>
               </div>
            </div>

            <Modal onClose={ closeModal } isShow={ visible }>
               { !isDelete
                  ? <WithModalTitle
                     title={ 'Подтвердите удаление' }
                     description={ 'Нам необходимо убедиться, что это не случайность' }
                  >
                     <DeleteRequest
                        thunkDelete={ thunkDelete }
                        closeModal={ closeModal }
                        setIsDelete={ setIsDelete }
                     />
                  </WithModalTitle>
                  : <OrderSuccess
                     { ...deleteSuccessText }
                     closeModal={ async () => {
                        await closeModal()
                        setIsDelete( false )
                     } }
                  />
               }
            </Modal>

         </div>
      </CSSTransition>
   )
}


export default DeletePanel;