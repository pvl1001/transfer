import { TColumn } from "../utils/types";

export const orderColumns: TColumn[] = [
   {
      Header: 'CCMP',
      CellTitle: 'Номер CCMP',
      accessor: 'ccmp', // accessor is the "key" in the data
      tooltip: 'tooltip CCMP',
   },
   {
      Header: 'MSISND',
      CellTitle: 'MSISND',
      accessor: 'msisnd',
      tooltip: 'tooltip MSISND',
   },
   {
      Header: 'CRM',
      CellTitle: 'Номер CRM',
      accessor: 'crm',
      tooltip: 'tooltip CRM',
   },
   {
      Header: 'Время внесения',
      CellTitle: 'Дата и время',
      accessor: 'createdAt',
      sort: true,
      disabled: true
   },
   {
      Header: 'Согласование',
      CellTitle: 'Статус',
      options: [
         {
            title: 'Согласовано',
            value: 'Согласовано'
         },
         {
            title: 'Не согласовано',
            value: 'Не согласовано'
         },
      ],
      accessor: 'status',
      tooltip: 'tooltip test',
   },
   {
      Header: 'Что переносим',
      CellTitle: 'Услуга',
      options: [
         {
            title: 'ТВ',
            value: 'ТВ'
         },
         {
            title: 'Связь',
            value: 'Связь'
         },
      ],
      accessor: 'transfer',
      tooltip: 'tooltip test',
   },
   {
      Header: 'Причина переноса',
      CellTitle: 'Причина',
      accessor: 'cause_transfer',
      tooltip: 'tooltip test',
   },
   {
      Header: 'Причина отказа',
      CellTitle: 'Причина',
      accessor: 'cause_rejection',
      tooltip: 'tooltip test',
   },
]
export const matchingColumns: TColumn[] = [
   {
      Header: 'Номер заявки',
      CellTitle: 'Номер заявки',
      accessor: 'id', // accessor is the "key" in the data
      tooltip: 'tooltip col1',
      disabled: true
   },
   {
      Header: 'Бывший продавец',
      CellTitle: 'Бывший продавец',
      accessor: 'ex_seller',
      tooltip: 'tooltip col2',
   },
   {
      Header: 'Будущий продавец',
      CellTitle: 'Будущий продавец',
      accessor: 'next_seller',
      tooltip: 'tooltip col3',
   },
   {
      Header: 'Кто внес позицию',
      CellTitle: 'Кто внес позицию',
      accessor: 'author',
      tooltip: 'tooltip col4',
      disabled: true
   },
   {
      Header: 'Ответственный',
      CellTitle: 'ФИО',
      accessor: 'responsible',
      tooltip: 'tooltip col5',
   },
   {
      Header: 'Дубли заявок',
      CellTitle: '',
      accessor: 'duplicate',
      tooltip: 'tooltip col6',
   },
   {
      Header: 'Вложения',
      CellTitle: '',
      accessor: 'attachments',
      tooltip: 'tooltip col7',
   },
]
export const operatorColumns: TColumn[] = [
   {
      Header: 'ФИО',
      CellTitle: 'ФИО',
      accessor: 'name', // accessor is the "key" in the data
   },
   {
      Header: 'Компания',
      CellTitle: 'Компания',
      accessor: 'company',
   },
   {
      Header: 'Отдел',
      CellTitle: 'Отдел',
      accessor: 'department',
   },
   {
      Header: 'Роль',
      CellTitle: 'Роль',
      accessor: 'role',
      options: [
         {
            title: 'Оператор',
            value: 'Оператор'
         },
         {
            title: 'Старший оператор',
            value: 'Старший оператор'
         },
         {
            title: 'Администратор',
            value: 'Администратор'
         },
      ],
   },
   {
      Header: 'Руководитель',
      CellTitle: 'Руководитель',
      accessor: 'supervisor',
   },
   {
      Header: 'Телефон',
      CellTitle: 'Телефон',
      accessor: 'phone',
   },
   {
      Header: 'Почта',
      CellTitle: 'Почта',
      accessor: 'email',
   },
]