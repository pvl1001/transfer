import s from "../OrderManually/OrderManually.module.scss"
import { useDropzone } from "react-dropzone";
import { BaseSyntheticEvent, FC, SyntheticEvent, useState } from "react";
import img from '../../../assets/images/type-order/load_file.png'
import { Button, Preloader } from "@megafon/ui-core";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import TableOverlay from "../../TableOverlay/TableOverlay";


type TDropZoneProps = {
   dropzoneDescription: string
   accept: Record<string, string[]>
   submitHandler: ( files: File[] ) => Promise<any>
   cbSubmit: () => void
}


const DropZone: FC<TDropZoneProps> = ( { dropzoneDescription, accept, submitHandler, cbSubmit } ) => {
   const dispatch = useAppDispatch()
   const isLoading = useAppSelector( state => state.tableOrders.status === 'loading' )

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
      disabled: isLoading,
   } )

   function deleteFile( e: SyntheticEvent, i: number ) {
      e.stopPropagation()
      setFiles( files.filter( ( _, idx ) => idx !== i ) )
   }

   async function submitOrder( e: BaseSyntheticEvent ) {
      e.stopPropagation()
      const res = await submitHandler( files )
      if ( !res.error ) cbSubmit()
   }


   return (
      <div className={ s.OrderManually__form_container_step4 }>
         { isLoading && <TableOverlay preloader={ false }/> }

         <div { ...getRootProps() }>
            { files.length > 0
               ? <>
                  <div className={ s.preloader }>
                     { isLoading && <Preloader/> }
                  </div>

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
                        <Button type={ 'outline' } theme={ 'black' }>
                           Добавить еще файл
                        </Button>
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