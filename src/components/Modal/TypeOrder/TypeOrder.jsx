import s from './TypeOrder.module.scss'
import TypeHandImage from '@images/type-order/Illustration.png'
import TypeXlsImage from '@images/type-order/Illustration (1).png'
import TypeOrderItem from "@/components/Modal/TypeOrder/TypeOrderItem.jsx";


function TypeOrder() {

   const typeOrder = [
      {
         id: 'manually',
         img: TypeHandImage,
         name: 'Ввести вручную',
         description: 'При вводе данных убедитесь, что заполнили все корректно. Это крайне важно.',
      },
      {
         id: 'xls',
         img: TypeXlsImage,
         name: 'Импортировать файл XLS',
         description: 'Внимательно проверьте, чтобы все данные в таблице были корректно заполнены.',
      },
   ]


   return (
      <div className={ s.TypeOrder }>
         <h2>Каким образом хотите добавить заявки?</h2>

         <div className={ s.TypeOrder__container }>
            { typeOrder.map( el =>
               <TypeOrderItem key={ el.id } data={ el }/>
            ) }
         </div>

      </div>
   )
}


export default TypeOrder