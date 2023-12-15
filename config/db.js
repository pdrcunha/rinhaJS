import Sequelize from 'sequelize';
// Configurando o Sequelize
export const sequelize = new Sequelize('rinhadb', 'root', '1234', {
    host: 'db',
    port: 3306, // Porta do banco de dados
    dialect: 'mysql',
});

// Sincronizando o modelo com o banco de dados
sequelize.sync()
    .then(() => {
        console.log('Banco de dados sincronizado');
    })
    .catch((err) => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });

