import s from './TableContainer.module.scss'
import { Button, Pagination, Search } from "@megafon/ui-core";
import { useState } from "react";
import useModal from "../../../hooks/useModal";
import { resetOrderType } from "../../../redux/slices/orderSlice";
import TabsBox from "../../TabsBox/TabsBox";
import OrderSuccess from "../../Modal/OrderSuccess/OrderSuccess";
import OrderFile from "../../Modal/OrderFile/OrderFile";
import OrderManually from "../../Modal/OrderManually/OrderManually";
import TypeOrder from "../../Modal/TypeOrder/TypeOrder";
import Modal from "../../Modal/Modal";
import Table from "../Table";
import PaginationBox from "../../PaginationBox";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { TPagination, TTab } from "../../../utils/types";


const successManual = {
   title: 'Заявка добавлена',
   description: 'Теперь она есть в списке всех заявок.',
}

const successXls = {
   title: 'Импорт завершен',
   description: 'Теперь все данные из файла есть в списке всех заявок.',
}


const tabs: TTab[] = [
   {
      title: 'Все',
      count: 165,
   },
   {
      title: 'Не согласовано',
      count: 120,
   },
   {
      title: 'Согласовано',
      count: 45,
   },
]


function TableContainer() {
   const dispatch = useAppDispatch()
   const { visible, closeModal, showModal } = useModal()
   const { order, pagination } = useAppSelector( state => ({
      order: state.order,
      pagination: state.tableOrders.pagination
   }) )

   function closeModalHandler() {
      closeModal()
      dispatch( resetOrderType() )
   }

   const successProps = order.type === 'manually'
      ? successManual
      : successXls

   const [ currentIndex, setCurrentIndex ] = useState( 1 );
   const handleTabClick = ( index: number ) => {
      setCurrentIndex( index + 1 );
   }


   return (
      <div className={ s.TableContainer }>
         <h2 className={ s.TableContainer__title }>Заявки</h2>
         <div className={ s.TableContainer__utils }>

            <TabsBox tabs={ tabs } onTabClick={ handleTabClick }/>

            <Search
               className={ s.TableContainer__search }
               placeholder="Поиск"
               searchId="1"
               classes={ { control: s.TableContainer__search } }
            />
            {/*@ts-ignore*/ }
            <Button onClick={ showModal }>
               + Новая заявка
            </Button>
         </div>

         <Table/>

         <PaginationBox totalPages={ pagination.total } activePage={ pagination.value } className={ s.pagination_box }>
            { ( { totalPages, activePage, onChange }: TPagination ) =>
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