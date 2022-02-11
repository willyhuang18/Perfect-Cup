const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Coffee extends Model {}

Coffee.init(
    {
        coffee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        coffee_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coffee_bean: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        coffee_roast: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        coffee_sweetener: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'coffee',
    }
);

module.exports = Coffee;
