const router = require("express").Router();
const { User, Coffee, CoffeeIngredient} = require("../../models");
const withAuth = require("../../utils/auth");

// GET all coffee
router.get("/", async (req, res) => {
    try {
        const coffeeData = await Coffee.findAll({
            attributes: ["coffee_id"],
            include: [
                {
                    model: User,
                    attributes: ["user_name"],
                },
            ],
        });
        res.status(200).json(coffeeData);
    } catch (err){
        res.status(500).json(err);
    }
});
//
// GET a single coffee
router.get("/:id", async (req, res) => {
    try {
        const coffeeData = await Coffee.findOne({
            attributes: ["coffee_id" ],
            include: [
                {
                    model: User,
                    attributes: ["user_name"],
                },
            ],
        });
        res.status(200).json(coffeeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a coffee
router.post("/", async(req, res) => {
    try{
        const coffeeData = await Coffee.create({
            coffee_id: req.session.user_id,
            user_id: req.session.user_id,
        });
        const ingredientData = await CoffeeIngredient.create({
            where:{
                ingredient_id : req.params.value1,
                ingredient_id : req.params.value2,
                ingredient_id : req.params.value3
            }
        })
        res.status(200).json(ingredientData);
        res.status(200).json(coffeeData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a coffee
router.put("/:id", async(req, res) => {
    Coffee.update(req.body, {
        where: {
            coffee_id: req.params.id
        },
    }).then(postData => {
        if(!postData) {
            res.status(404).json({message: "No post found with this id!"});
            return;
        }
        res.status(200).json(postData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// DELETE a coffee
router.delete("/:id", async(req, res) =>{
    try {
        const coffeeData = await Coffee.destroy({
            where: {
                coffee_id: req.params.id
            }
        });
        if (!coffeeData) {
            res.status(404).json ({ message: "No coffee found with this id!"});
            return;
        }
        res.status(200).json(coffeeData);
    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;






