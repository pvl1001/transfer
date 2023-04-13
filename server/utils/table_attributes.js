// выборка и переименование данных из таблицы
class TableAttributes {
   attr_orders = [
      [ 'id', 'Номер заявки' ],
      [ 'ccmp', 'CCMP' ],
      [ 'msisnd', 'MSISND' ],
      [ 'crm', 'CRM' ],
      [ 'createdAt', 'Дата внесения' ],
      [ 'status', 'Согласование' ],
      [ 'transfer', 'Что переносим' ],
      [ 'cause_transfer', 'Причина переноса' ],
      [ 'cause_rejection', 'Причина отказа' ],
      [ 'ex_seller', 'Бывший продавец' ],
      [ 'next_seller', 'Будущий продавец' ],
      [ 'author', 'Кто внес позицию' ],
      [ 'responsible', 'Ответственный' ],
      [ 'duplicate', 'Дубли заявок' ],
   ]

   attr_operators = [
      [ "name", "ФИО" ],
      [ "company", "Компания" ],
      [ "department", "Отдел" ],
      [ "role", "Роль" ],
      [ "supervisor", "Руководитель" ],
      [ "phone", "Телефон" ],
      [ "email", "Почта" ],
   ]


}

module.exports = new TableAttributes()