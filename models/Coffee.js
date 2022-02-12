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
            references: {       //added MT
                model: 'bean',      //added MT
                key: 'bean_id', //added MT
            },
        },
        coffee_roast: {
            type: DataTypes.INTEGER,
            references: {
                model: 'roast',
                key: 'roast_id',
            },
        },
        coffee_sweetener: {
            type: DataTypes.INTEGER,
            references: {
                model: 'sweetener',
                key: 'sweetener_id',
            },
        },

    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'coffee',
    }
);

module.exports = Coffee;
