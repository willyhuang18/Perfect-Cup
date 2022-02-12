const sequelize = require('../config/connection');
const {User, Coffee, Roast, Bean, Sweetener } = require('../models');

const userData = require('./user-seeds.json');
const coffeeData = require('./coffee-seeds.json');
const roastData = require('./roast-seeds.json');
const beanData = require('./bean-seeds.json');
const sweetenerData = require('./sweetener-seeds.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Coffee.bulkCreate(coffeeData, {
        individualHooks: true,
        returning: true,
    });

    await Roast.bulkCreate(roastData, {
        individualHooks: true,
        returning: true,
    });

    await Bean.bulkCreate(beanData, {
        individualHooks: true,
        returning: true,
    });

    await Sweetener.bulkCreate(sweetenerData, {
        individualHooks: true,
        returningL: true,
    });
}

seedDatabase();