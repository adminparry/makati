const Sequelize = require('sequelize');
module.exports = [
    'list',
    {
        id: {
            type: Sequelize.STRING(50),
            primaryKey: true
        },
        title: Sequelize.STRING,
        description: Sequelize.STRING
    },
    {
        freezeTableName: true,
        tableName: 'list',
        timestamps: false 
    }
]