import s from './DownloadOrder.module.scss'
import ImgCub from '../../../assets/images/cub.png'
import DownloadForm from "./DownloadForm";


function DownloadOrder() {
   return (
      <div className={ s._ }>
         <div className={ s.head_wrapper }>
            <img src={ ImgCub } alt="cub"/>
            <h2>Как выгрузить заявки?</h2>
            <p>Отметьте по каким параметрам необходимо выгрузить файл.<br/>
               Если ничего не отметить, то выгрузятся все заявки.</p>
         </div>

         <DownloadForm/>
      </div>
   )
}

export default DownloadOrder