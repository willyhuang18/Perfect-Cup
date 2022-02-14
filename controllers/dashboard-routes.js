//getting all model 
const { User, Coffee, Ingredient } = require('../models');
const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

//display Coffee in the dashboard
router.get('/', withAuth, (req, res)=>{
    //checking 
    console.log(req.session);
    //find all
    Coffee.findAll({
        where:{
            //using ID to indicate
            user_id:req.session.user_id
        },
        attributes: ['coffee_id'],
        include: [
            {
                model:Ingredient,
                attributes: ['ingredient_id', 'ingredient_description', 'user_id'],
                include :{
                    model: User,
                    attributes: ['user_name']
                }
            },
            {
                model: User,
                attributes: ['user_name']
            },
        ]
    })
    .then(response => {
        //serialize data
        const userCoffee = response.map(coffee => coffee.get({plain: true}));
        //pass that into homepage
        res.render('dashboard', {userCoffee, loggedIn: true})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

//render edit page
router.get('/edit/:id', withAuth, (req, res) => {
    Coffee.findOne({
        where: {coffee_id: req.params.coffee_id},
        attributes: ['coffee_id'],
        include: [
            {
                model: Ingredient,
                attributes: ['ingredient_id', 'ingredient_description', 'user_id',],
                include :{
                    model: User,
                    attributes: ['user_name']
                }
            },
            {
                model: User,
                attributes: ['user_name']
            },
        ]
    })
    .then(response => {
        const userCoffee = response.get({plain: true});
        //pass that into homepage
        res.render('edit-posts', {userCoffee, loggedIn: true})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

// rendering newPost page 
router.get('/new-coffee', withAuth, (req, res) => {
    Coffee.findAll({
        where: { user_id: req.session.user_id},
        attributes: ['coffee_id'],
        include: [
            {
                model: Ingredient,
                attributes: ['ingredient_id', 'ingredient_description', 'user_id'],
                include :{
                    model: User,
                    attributes: ['user_name']
                }
            },
            {
                model: User,
                attributes: ['user_name']
            },
        ]
    })
    .then(response => {
        const userCoffee = response.map(coffee => coffee.get({plain: true}));
        //pass that into homepage
        res.render('new-coffee', {userCoffee, loggedIn: true})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports= router;
  //add