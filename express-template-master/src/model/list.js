const sequelize = require('../database/mysql');

const { Sequelize, Model, DataTypes } = require('sequelize');


class List extends Model { }

List.init(require('../tables/list')[1], { sequelize, modelName: 'list' });

module.exports = List 