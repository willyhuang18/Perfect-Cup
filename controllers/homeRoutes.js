

// Contain routes - the homepage and login page
const router = require("express").Router();
//const { User, Coffee, Bean, Roast, Sweetener } = require("../../models");
const { User, Coffee, Bean, Roast, Sweetener } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const coffeeData = await Coffee.findAll({
            attributes: ["coffee_id", "coffee_name", "coffee_bean", "coffee_roast", "coffee_sweetener" ],
            include: [
                {
                    model: User,
                    attributes: ["user_name"],
                },
                {
                    model: Bean,
                    attributes: ["bean_id", "bean_name", "bean_description", "bean_origin"],
                    include: {
                        model: User,
                        attributes: ["user_name"]
                    }
                },
                {
                    model: Roast,
                    attributes: ["roast_id", "roast_name", "roast_description", "roast_origin"],
                },
                {
                    model: Sweetener,
                    attributes: ["sweetener_id", "sweetener_name", "sweetener_description", "sweetener_origin"],
                },
            ],
        });
        // Serialize data for template
        const coffee = coffeeData.map(coffee => coffee.get({ plain: true }));
        // Pass serialized data and session flag into template
        res.render("homepage", {
            coffee,
            logged_in: req.session.logged_in
        });
    } catch (err){
        res.status(500).json(err);
    }
});

// Render one coffee 
router.get("/coffee/:id", async (req, res) =>{
    try {
        const coffeeData = await Coffee.findByPk(req.params.id, { 
            include: [
                {
                    model: User,
                    attributes: ["user_name"]
                },
                {
                    model: Bean,
                    attributes: ["bean_id", "bean_name", "bean_description", "bean_origin"],
                    include: {
                        model: User,
                        attributes: ["user_name"]
                    }
                },
                {
                    model: Roast,
                    attributes: ["roast_id", "roast_name", "roast_description", "roast_origin"],
                },
                {
                    model: Sweetener,
                    attributes: ["sweetener_id", "sweetener_name", "sweetener_description", "sweetener_origin"],
                },
            ],
        });
        const coffee = coffeeData.get({ plain: true});

const router = require('express').Router();

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

module.exports = router;


// // Contain routes - the homepage and login page
// const router = require("express").Router();
// const { User, Coffee, Bean, Roast, Sweetener } = require("../../models");
// const withAuth = require("../utils/auth");


// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
    try{
        //Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"]},
            include: [{ model: Coffee }],
        });
        const user = userData.get({ plain: true});
=======
// router.get("/", async (req, res) => {
//     try {
//         const coffeeData = await Coffee.findAll({
//             attributes: ["coffee_id", "coffee_name", "coffee_bean", "coffee_roast", "coffee_sweetener" ],
//             include: [
//                 {
//                     model: User,
//                     attributes: ["user_name"],
//                 },
//                 {
//                     model: Bean,
//                     attributes: ["bean_id", "bean_name", "bean_description", "bean_origin"],
//                     include: {
//                         model: User,
//                         attributes: ["user_name"]
//                     }
//                 },
//                 {
//                     model: Roast,
//                     attributes: ["roast_id", "roast_name", "roast_description", "roast_origin"],
//                 },
//                 {
//                     model: Sweetener,
//                     attributes: ["sweetener_id", "sweetener_name", "sweetener_description", "sweetener_origin"],
//                 },
//             ],
//         });
//         // Serialize data for template
//         const coffee = coffeeData.map(coffee => coffee.get({ plain: true }));
//         // Pass serialized data and session flag into template
//         res.render("homepage", {
//             posts,
//             logged_in: req.session.logged_in
//         });
//     } catch (err){
//         res.status(500).json(err);
//     }
// });


// // Render one post 
// router.get("/coffee/:id", async (req, res) =>{
//     try {
//         const coffeeData = await Coffee.findByPk(req.params.id, { 
//             include: [
//                 {
//                     model: User,
//                     attributes: ["user_name"]
//                 },
//                 {
//                     model: Bean,
//                     attributes: ["bean_id", "bean_name", "bean_description", "bean_origin"],
//                     include: {
//                         model: User,
//                         attributes: ["user_name"]
//                     }
//                 },
//                 {
//                     model: Roast,
//                     attributes: ["roast_id", "roast_name", "roast_description", "roast_origin"],
//                 },
//                 {
//                     model: Sweetener,
//                     attributes: ["sweetener_id", "sweetener_name", "sweetener_description", "sweetener_origin"],
//                 },
//             ],
//         });
//         const coffee = coffeeData.get({ plain: true});


// If the user is already logged in, redirect the request to another route
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/"); 
        return;
    }
    res.render("login");
});
=======
//         res.render("coffee", {
//             ...coffee,
//             logged_in: req.session.logged_in
//         });
//     } catch(err) {
//         res.status(500).json(err);
//     }
// });


// // Use withAuth middleware to prevent access to route
// router.get("/profile", withAuth, async (req, res) => {
//     try{
//         //Find the logged in user based on the session ID
//         const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ["password"]},
//             include: [{ model: Post }],
//         });
//         const user = userData.get({ plain: true});

//         res.render("profile", {
//             ...user,
//             logged_in: true
//         });
//     } catch (err){
//         res.status(500).json(err);
//     }
// });

// // If the user is already logged in, redirect the request to another route
// router.get("/login", (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect("/"); //res.redirect("/post");
//         return;
//     }
//     res.render("login");
// });

// // Render sign up 
// router.get("/signup", (req, res) => {
//     res.render("signup");
// });

// module.exports = router;