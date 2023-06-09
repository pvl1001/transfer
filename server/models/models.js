const sequelize = require( '../db' )
const { DataTypes } = require( 'sequelize' )

const Orders = sequelize.define( 'orders', {
   author: { type: DataTypes.STRING, defaultValue: 'Иванов Иван Иванович' },
   ccmp: { type: DataTypes.STRING, defaultValue: 'ccmp' },
   crm: { type: DataTypes.STRING, defaultValue: 'crm' },
   msisnd: { type: DataTypes.STRING, defaultValue: 'msisnd' },
   status: { type: DataTypes.STRING, defaultValue: 'Не согласовано' },
   transfer: { type: DataTypes.STRING, defaultValue: 'transfer' },

   before_order_number: { type: DataTypes.STRING, defaultValue: 'before_order_number' },
   duplicate: { type: DataTypes.INTEGER, defaultValue: 1 },
   cause_transfer: { type: DataTypes.STRING, defaultValue: 'Причина переноса' },
   cause_rejection: { type: DataTypes.STRING, defaultValue: 'Причина отказа' },

   ex_seller: { type: DataTypes.STRING, defaultValue: 'ex_seller' },
   next_seller: { type: DataTypes.STRING, defaultValue: 'next_seller' },

   responsible: { type: DataTypes.STRING, defaultValue: 'Ответственный' },
   images: { type: DataTypes.STRING }
} )

const Operators = sequelize.define( 'operators', {
   name: { type: DataTypes.STRING, defaultValue: 'Иванов Иван Иванович' },
   company: { type: DataTypes.STRING, defaultValue: 'МегаФон' },
   department: { type: DataTypes.STRING, defaultValue: 'Отдел' },
   role: { type: DataTypes.STRING, defaultValue: 'Администратор' },
   supervisor: { type: DataTypes.STRING, defaultValue: 'Иванов Иван Иванович' },
   phone: { type: DataTypes.STRING, defaultValue: '+70000000000' },
   email: { type: DataTypes.STRING, defaultValue: 'test@megafon.ru' },
   password: DataTypes.STRING,
} )

module.exports = {
   Orders, Operators
}
