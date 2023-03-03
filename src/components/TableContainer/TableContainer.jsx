import s from './TableContainer.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { Button, Pagination, Search } from "@megafon/ui-core";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import { resetOrderType } from "../../store/slices/orderSlice";
import TabsBox from "../../components-ui/Tabs/TabsBox";
import OrderSuccess from "../Modal/OrderSuccess/OrderSuccess";
import OrderFile from "../Modal/OrderFile/OrderFile";
import OrderManually from "../Modal/OrderManually/OrderManually";
import TypeOrder from "../Modal/TypeOrder/TypeOrder";
import Modal from "../Modal/Modal";
import Table from "../Table/Table";
import PaginationBox from "../PaginationBox";


const successManual = {
   title: 'Заявка добавлена',
   description: 'Теперь она есть в списке всех заявок.',
}

const successXls = {
   title: 'Импорт завершен',
   description: 'Теперь все данные из файла есть в списке всех заявок.',
}


function TableContainer() {
   const dispatch = useDispatch()
   const { visible, closeModal, showModal } = useModal()
   const order = useSelector( store => store.order )

   function closeModalHandler() {
      closeModal()
      dispatch( resetOrderType() )
   }

   const successProps = order.type === 'manually'
      ? successManual
      : successXls

   const [ currentIndex, setCurrentIndex ] = useState( 1 );
   const handleTabClick = ( index ) => {
      setCurrentIndex( index + 1 );

      console.log( index )
   };


   return (
      <div className={ s.TableContainer }>
         <h2 className={ s.TableContainer__title }>Заявки</h2>
         <div className={ s.TableContainer__utils }>

            <TabsBox onTabClick={ handleTabClick }/>

            <Search
               className={ s.TableContainer__search }
               placeholder="Поиск"
               searchId="1"
               classes={ { control: s.TableContainer__search } }
            />

            <Button theme={ 'green' } onClick={ showModal }>
               + Новая заявка
            </Button>
         </div>

         <Table/>


         <PaginationBox totalPages={ 7 } activePage={ 1 } className={ s.pagination_box } >
            { ( { totalPages, activePage, onChange } ) =>
               <Pagination
                  totalPages={ totalPages }
                  activePage={ activePage }
                  onChange={ onChange }
               />
            }
         </PaginationBox>

         { visible &&
            <Modal onClose={ closeModalHandler }>
               { order.type === '' && <TypeOrder/> }
               { order.type === 'manually' && <OrderManually/> }
               { order.type === 'xls' && <OrderFile/> }
               { order.type === 'success' &&
                  <OrderSuccess
                     { ...successProps }
                     closeModal={ closeModal }
                  /> }
            </Modal> }
      </div>
   )
}

export default TableContainer