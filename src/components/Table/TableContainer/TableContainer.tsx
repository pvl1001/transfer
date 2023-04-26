import s from './TableContainer.module.scss'
import { Button, Pagination, Search } from "@megafon/ui-core";
import useModal from "../../../hooks/useModal";
import { resetOrderType } from "../../../redux/slices/orderSlice";
import TabsBox from "../../TabsBox/TabsBox";
import OrderSuccess from "../../Modal/OrderSuccess/OrderSuccess";
import OrderFile from "../../Modal/OrderFile/OrderFile";
import OrderManually from "../../Modal/OrderManually/OrderManually";
import TypeOrder from "../../Modal/TypeOrder/TypeOrder";
import Modal from "../../Modal/Modal";
import Table from "../Table";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { TTab } from "../../../utils/types";
import { setCurrentTab, setCurrentPagination, setSearch } from "../../../redux/slices/tableOrdersSlice";
import { ORDERS_AGREED, ORDERS_ALL, ORDERS_NO_AGREED } from '../../../utils/variables'


function TableContainer() {
   const dispatch = useAppDispatch()
   const { visible, closeModal, showModal } = useModal()
   const {
      order,
      orders,
      pagination,
      count,
      defaultIndex,
      search
   } = useAppSelector( state => ({
      order: state.order,
      orders: state.tableOrders.orders,
      pagination: state.tableOrders.pagination,
      count: state.tableOrders.count,
      defaultIndex: state.tableOrders.tab.index,
      search: state.tableOrders.search,
   }) )

   const tabs: TTab[] = [
      {
         title: 'Все',
         count: count.all,
         value: ORDERS_ALL
      },
      {
         title: 'Не согласовано',
         count: count.noagreed,
         value: ORDERS_NO_AGREED
      },
      {
         title: 'Согласовано',
         count: count.agreed,
         value: ORDERS_AGREED
      },
   ]

   async function closeModalHandler(): Promise<void> {
      await closeModal()
      dispatch( resetOrderType() )
   }

   function handleTabClick( index: number ): void {
      dispatch( setCurrentTab( { index, value: tabs[index].value } ) )
   }

   function onChange( index: number ): void {
      dispatch( setCurrentPagination( index ) )
   }

   function onSearch( value: string ): void {
      dispatch( setSearch( value ) )
   }


   return (
      <div className={ s.TableContainer }>
         <h2 className={ s.TableContainer__title }>Заявки</h2>
         <div className={ s.TableContainer__utils }>

            <TabsBox tabs={ tabs } defaultIndex={ defaultIndex } onTabClick={ handleTabClick }/>

            <Search
               type="compact"
               className={ s.TableContainer__search }
               placeholder="Поиск"
               searchId="1"
               value={ search }
               classes={ { control: s.TableContainer__search } }
               onChange={ onSearch }
            />
            {/*@ts-ignore*/ }
            <Button onClick={ showModal }>
               + Новая заявка
            </Button>
         </div>


         { orders.length
            ? <>
               <Table/>

               <div className={ s.pagination_box }>
                  <Pagination
                     activePage={ pagination.current }
                     totalPages={ pagination.total }
                     onChange={ onChange }
                  />
               </div>
            </>
            : <>Список пуст</>
         }


         <Modal onClose={ closeModalHandler } isShow={ visible }>
            { order.type === '' && <TypeOrder/> }
            { order.type === 'manually' && <OrderManually/> }
            { order.type === 'xls' && <OrderFile/> }
            { order.type === 'manually_success' &&
               <OrderSuccess
                  title={ 'Заявка добавлена' }
                  description={ 'Теперь она есть в списке всех заявок.' }
                  closeModal={ closeModal }
               /> }
            { order.type === 'xls_success' &&
               <OrderSuccess
                  title={ 'Импорт завершен' }
                  description={ 'Теперь все данные из файла есть в списке всех заявок.' }
                  closeModal={ closeModal }
               /> }
         </Modal>
      </div>
   )
}

export default TableContainer