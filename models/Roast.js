const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Roast extends Model {}

Roast.init(
    {
        roast_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        roast_name: {
            type: DataTypes.STRING,
            allownull: false,
        },
        roast_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coffee_roast: {
            type: DataTypes.INTEGER,
            references: {
                model: 'coffee',
                key: 'coffee_roast',
            },
        },

    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'roast'
    }
);

module.exports = Roast;