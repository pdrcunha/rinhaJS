import Sequelize from 'sequelize';
// Configurando o Sequelize
export const sequelize = new Sequelize('rinhadb', 'root', '1234', {
    host: 'db',
    port: 3306, // Porta do banco de dados
    dialect: 'mysql',
       pool: {
        max: 5000,
        min: 1000,
        acquire: 30000,
        idle: 10000
      }
});





