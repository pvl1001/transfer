import s from "../OrderManually/OrderManually.module.scss"
import { useDropzone } from "react-dropzone";
import { BaseSyntheticEvent, FC, SyntheticEvent, useState } from "react";
import { setOrderType } from "../../../redux/slices/orderSlice";
import img from '../../../assets/images/type-order/load_file.png'
import preloader from '../../../assets/images/type-order/Preloader.png'
import { Button } from "@megafon/ui-core";
import { useAppDispatch } from "../../../redux/store";


type TDropZoneProps = {
   dropzoneDescription: string
   accept: Record<string, string[]>
   submitHandler: ( files: File[] ) => void
}


const DropZone: FC<TDropZoneProps> = ( { dropzoneDescription, accept, submitHandler } ) => {
   const dispatch = useAppDispatch()

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
      setFiles( files.filter( ( _, idx ) => idx !== i ) )
   }

   async function submitOrder( e: BaseSyntheticEvent ) {
      e.stopPropagation()
      submitHandler( files )
      dispatch( setOrderType( 'success' ) )
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
                        {/*@ts-ignore*/ }
                        <Button type={ 'outline' } theme={ 'black' }>Добавить еще файл</Button>
                     </label>
                     {/*@ts-ignore*/ }
                     <Button onClick={ submitOrder }>Завершить заявку</Button>
                  </div>
               </>
               : <>
                  <img src={ img } alt="load_file" height={ 144 }/>

                  <p>{ dropzoneDescription }</p>

                  <div className={ s.OrderManually__form_container_step4_btns }>
                     <label>
                        <input { ...getInputProps() }/>
                        {/*@ts-ignore*/ }
                        <Button>Загрузить с компьютера</Button>
                     </label>
                  </div>

               </>
            }
         </div>
      </div>

   )
}


export default DropZone