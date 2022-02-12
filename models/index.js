const User = require('./User');
const Coffee = require('./Coffee');
const Bean = require('./Bean');
const Roast = require('./Roast');
const Sweetener = require('./Sweetener');

/*
Coffee.belongsTo(User, {
    foreignKey: 'user_id'
});

Bean.belongsTo(Coffee, {
    foreignKey: 'coffee_bean'
});

Roast.belongsTo(Coffee, {
    foreignKey: 'coffee_roast'
});

Sweetener.belongsTo(Coffee, {
    foreignKey: 'coffee_sweetner'
});
*/


module.exports = { User, Coffee, Bean, Roast, Sweetener };