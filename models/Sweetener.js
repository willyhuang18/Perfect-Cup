const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sweetener extends Model {}

Sweetener.init( 
    {
        sweetener_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        sweetener_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sweetener_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sweetener_origin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'sweetener',
    }
    );

    module.exports = Sweetener;