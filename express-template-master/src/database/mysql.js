const Sequelize = require('sequelize');

const { mysql:{username, password, host, database} } = require('../config/database');

const sequelize = new Sequelize(database, username, password, {
    host,
    define:{
        timestamps: false
    },
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

module.exports = sequelize