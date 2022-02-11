const User = require('./User');
const Coffee = require('./Coffee');
const Bean = require('./Bean');
const Roast = require('./Roast');
const Sweetener = require('./Sweetener');

Coffee.belongsTo(User, {
    foreignKey: 'user_id'
});



module.exports = { User, Coffee, Bean, Roast, Sweetener };