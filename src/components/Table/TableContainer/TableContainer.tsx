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
import { setCurrentTab, thunkGetOrders } from "../../../redux/slices/tableOrdersSlice";
import { ORDERS_AGREED, ORDERS_ALL, ORDERS_NO_AGREED } from '../../../utils/variables'
import getQuery from "../../../utils/helpers/getQuery";


const successManual = {
   title: 'Заявка добавлена',
   description: 'Теперь она есть в списке всех заявок.',
}

const successXls = {
   title: 'Импорт завершен',
   description: 'Теперь все данные из файла есть в списке всех заявок.',
}


function TableContainer() {
   const dispatch = useAppDispatch()
   const { visible, closeModal, showModal } = useModal()
   const {
      order,
      pagination,
      count,
      sortStatus,
      currentTab,
      defaultIndex
   } = useAppSelector( state => ({
      order: state.order,
      pagination: state.tableOrders.pagination,
      count: state.tableOrders.count,
      sortStatus: state.tableOrders.sortStatus,
      defaultIndex: state.tableOrders.tab.index,
      currentTab: state.tableOrders.tab.value,
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

   function closeModalHandler() {
      closeModal()
      dispatch( resetOrderType() )
   }

   const successProps = order.type === 'manually'
      ? successManual
      : successXls

   const handleTabClick = ( index: number ) => {
      dispatch( setCurrentTab( { index, value: tabs[index].value } ) )
      dispatch( thunkGetOrders( {
         method: 'GET',
         query: getQuery( {
            currentTab: tabs[index].value,
            pagination: 1,
            sortStatus
         } )
      } ) )
   }

   function onChange ( index: number ) {
      dispatch( thunkGetOrders( {
         method: "GET",
         query: getQuery( { pagination: index, currentTab, sortStatus } )
      } ) )
   }


   return (
      <div className={ s.TableContainer }>
         <h2 className={ s.TableContainer__title }>Заявки</h2>
         <div className={ s.TableContainer__utils }>

            <TabsBox tabs={ tabs } defaultIndex={ defaultIndex } onTabClick={ handleTabClick }/>

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

         <div className={ s.pagination_box }>
            <Pagination
               activePage={ pagination.current }
               totalPages={ pagination.total }
               onChange={ onChange }
            />
         </div>

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