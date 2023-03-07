import s from './TableContainer.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@megafon/ui-core";
import { useState } from "react";
import useModal from "../../../hooks/useModal";
import { resetOrderType } from "../../../store/slices/orderSlice";
import TypeOrder from "../../Modal/TypeOrder/TypeOrder";
import OrderManually from "../../Modal/OrderManually/OrderManually";
import OrderFile from "../../Modal/OrderFile/OrderFile";
import OrderSuccess from "../../Modal/OrderSuccess/OrderSuccess";
import Modal from "../../Modal/Modal";
import PaginationBox from "../../PaginationBox";
import TableUtils from "../TableUtils";
import TableOperators from "../TableOperators";


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
   const { visible, closeModal } = useModal()
   const order = useSelector( store => store.order )

   function closeModalHandler() {
      closeModal()
      dispatch( resetOrderType() )
   }

   const successProps = order.type === 'manually'
      ? successManual
      : successXls

   const [ currentIndex, setCurrentIndex ] = useState( 1 )
   const handleTabClick = ( index ) => {
      setCurrentIndex( index + 1 )

      console.log( index )
   }


   return (
      <div className={ s.TableContainer }>

         <h2 className={ s.TableContainer__title }>
            Операторы
         </h2>

         <TableUtils handleTabClick={ handleTabClick }/>

         <TableOperators/>

         <PaginationBox totalPages={ 12 } activePage={ 1 } className={ s.pagination_box }>
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