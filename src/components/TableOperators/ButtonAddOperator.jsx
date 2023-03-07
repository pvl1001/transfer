import { useState } from 'react';
import { Button } from "@megafon/ui-core";
import Modal from "../Modal/Modal";
import WithModalTitle from "../Modal/WithModalTitle/WithModalTitle";
import AddOperator from "../Modal/AddOperator/AddOperator";
import OrderSuccess from "../Modal/OrderSuccess/OrderSuccess";
import useModal from "../../hooks/useModal";


function ButtonAddOperator() {
   const [ success, setSuccess ] = useState( false )
   const { visible, showModal, closeModal } = useModal()

   function closeModalHandler() {
      closeModal()
      setSuccess( false )
   }


   return (
      <>
         <Button onClick={ showModal }>
            + Добавить оператора
         </Button>

         { visible &&
            <Modal onClose={ closeModal }>
               { !success &&
                  <WithModalTitle
                     title={ 'Добавить оператора' }
                     description={ 'Внесите все данные по заявке корректно.<br/>Это очень важно.' }
                  ><AddOperator setSuccess={ setSuccess }/>
                  </WithModalTitle>
               }

               { success &&
                  <OrderSuccess
                     title={ 'Оператор добавлен' }
                     description={ 'Теперь он есть в списке всех операторов.' }
                     closeModal={ closeModalHandler }
                  />
               }
            </Modal>
         }
      </>
   )
}


export default ButtonAddOperator;