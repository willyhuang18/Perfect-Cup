const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bean extends Model {}

Bean.init(
    {
        bean_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        bean_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bean_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bean_origin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'bean',
    }

);

module.exports = Bean;