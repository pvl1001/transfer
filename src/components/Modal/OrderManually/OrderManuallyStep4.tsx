import s from "../OrderManually/OrderManually.module.scss"
import { useDropzone } from "react-dropzone";
import { BaseSyntheticEvent, FC, SyntheticEvent, useState } from "react";
import { setOrderData, setOrderType } from "../../../redux/slices/orderSlice";
import img from '../../../assets/images/type-order/load_file.png'
import preloader from '../../../assets/images/type-order/Preloader.png'
import { Button } from "@megafon/ui-core";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { thunkGetOrders } from "../../../redux/slices/tableOrdersSlice";


type TOrderManuallyStep4Props = {
   dropzoneDescription: string
   accept: Record<string, string[]>
}


const OrderManuallyStep4: FC<TOrderManuallyStep4Props> = ( { dropzoneDescription, accept } ) => {
   const dispatch = useAppDispatch()
   const {
      orderForm,
      tab,
      pagination
   } = useAppSelector( state => ({
      orderForm: state.order.data,
      tab: state.tableOrders.tab.value,
      pagination: state.tableOrders.pagination.current,

   }) )
   const [ files, setFiles ] = useState<Array<File>>( [] )
   const { getRootProps, getInputProps } = useDropzone( {
      accept,
      onDrop: files => {
         setFiles( prev => [ ...prev, ...files ] )
      },
      onDropRejected: files => {
         console.log( files )
      },
      maxSize: 5000000,
   } )

   function deleteFile( e: SyntheticEvent, i: number ) {
      e.stopPropagation()
      const copy = [ ...files ]
      copy.splice( i, 1 )
      setFiles( copy )
   }

   async function onEndOrder( e: BaseSyntheticEvent ) {
      e.stopPropagation()
      dispatch( setOrderType( 'success' ) )
      dispatch( setOrderData( { files } ) )
      dispatch( thunkGetOrders( {
         method: 'POST',
         payload: { orderForm, tab, pagination }
      } ) )
   }


   return (
      <div className={ s.OrderManually__form_container_step4 }>
         <div { ...getRootProps() }>
            { files.length > 0
               ? <>
                  <img src={ preloader } alt="load_file" height={ 144 }/>

                  { !!files.length &&
                     <ul className={ s.OrderManually__files }>
                        { files.map( ( file, i ) =>
                           <li key={ i }>{ file.name }
                              <button type={ 'button' } onClick={ ( e: SyntheticEvent ) => deleteFile( e, i ) }/>
                           </li>
                        ) }
                     </ul>
                  }

                  <div className={ s.OrderManually__form_container_step4_btns }>
                     <label>
                        <input { ...getInputProps() }/>
                        <Button type={ 'outline' } theme={ 'black' }>Добавить еще файл</Button>
                     </label>
                     <Button onClick={ onEndOrder }>Завершить заявку</Button>
                  </div>
               </>
               : <>
                  <img src={ img } alt="load_file" height={ 144 }/>

                  <p>{ dropzoneDescription }</p>

                  <div className={ s.OrderManually__form_container_step4_btns }>
                     <label>
                        <input { ...getInputProps() }/>
                        <Button>Загрузить с компьютера</Button>
                     </label>
                  </div>

               </>
            }
         </div>
      </div>

   )
}


export default OrderManuallyStep4