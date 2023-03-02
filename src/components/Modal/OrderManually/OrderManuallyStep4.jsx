import s from "@/components/Modal/OrderManually/OrderManually.module.scss"
import button from "@/components-ui/Button/Button.module.scss"
import img from '@images/type-order/load_file.png'
import preloader from '@images/type-order/Preloader.png'
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import Button from "@/components-ui/Button/Button.jsx";
import { useDispatch } from "react-redux";
import { setOrderData, setOrderType } from "@/store/slices/orderSlice.js";


function OrderManuallyStep4( { dropzoneDescription, accept } ) {
   const dispatch = useDispatch()
   const [ files, setFiles ] = useState( [] )
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

   function deleteFile( e, i ) {
      e.stopPropagation()
      const copy = [ ...files ]
      copy.splice( i, 1 )
      setFiles( copy )
   }

   function onEndOrder( e ) {
      e.stopPropagation()
      dispatch( setOrderType( 'success' ) )
      dispatch( setOrderData( { files } ) )
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
                              <button type={ 'button' } onClick={ ( e ) => deleteFile( e, i ) }/>
                           </li>
                        ) }
                     </ul>
                  }

                  <div className={ s.OrderManually__form_container_step4_btns }>
                     <label className={ `${ button.Button } ${ button.Button_black }` }>
                        <input { ...getInputProps() }/>
                        Добавить еще файл
                     </label>
                     <Button theme={ 'green' } onClick={ onEndOrder }>Завершить заявку</Button>
                  </div>
               </>
               : <>
                  <img src={ img } alt="load_file" height={ 144 }/>

                  <p>{ dropzoneDescription }</p>

                  <div className={ s.OrderManually__form_container_step4_btns }>
                     <label className={ `${ button.Button } ${ button.Button_green }` }>
                        <input { ...getInputProps() }/>
                        Загрузить с компьютера
                     </label>
                  </div>

               </>
            }
         </div>
      </div>

   )
}


export default OrderManuallyStep4