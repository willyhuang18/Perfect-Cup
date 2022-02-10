const User = require('./User');
const Coffee = require('./Coffee');

Coffee.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Coffee };