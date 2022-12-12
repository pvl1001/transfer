import s from './MainText.module.scss'


function MainText() {
   return (
      <div className={ s.MainText }>
         <h1 className={ s.MainText__title }>
            Быстрый и удобный перенос продаж</h1>

         <p className={ s.MainText__description }>— Здесь краткое описание</p>
         <p className={ s.MainText__description }>— Здесь краткое описание</p>
         <p className={ s.MainText__description }>— Здесь краткое описание</p>
      </div>
   )
}


export default MainText