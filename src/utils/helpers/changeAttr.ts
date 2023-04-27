export default function changeAttr( arr: string[]) {
   return arr.map( el =>
      Object.fromEntries(
         Object.entries( el ).map( ( [ key, val ] ) => {
            if ( key === 'Номер заявки' ) return [ 'id', val ]
            if ( key === 'CCMP' ) return [ 'ccmp', val ]
            if ( key === 'MSISND' ) return [ 'msisnd', val ]
            if ( key === 'CRM' ) return [ 'crm', val ]
            if ( key === 'Дата внесения' ) return [ 'createdAt', val ]
            if ( key === 'Согласование' ) return [ 'status', val ]
            if ( key === 'Что переносим' ) return [ 'transfer', val ]
            if ( key === 'Причина переноса' ) return [ 'cause_transfer', val ]
            if ( key === 'Причина отказа' ) return [ 'cause_rejection', val ]
            if ( key === 'Бывший продавец' ) return [ 'ex_seller', val ]
            if ( key === 'Будущий продавец' ) return [ 'next_seller', val ]
            if ( key === 'Кто внес позицию' ) return [ 'author', val ]
            if ( key === 'Ответственный' ) return [ 'responsible', val ]
            if ( key === 'Дубли заявок' ) return [ 'duplicate', val ]
            return [key, val]
         } )
      )
   )
}