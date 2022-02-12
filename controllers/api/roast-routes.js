const router = require("express").Router();
const { User, Coffee, Bean, Roast, Sweetener } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all roasts
router.get("/", async (req, res) => {
    try {
        const roastData = await Roast.findAll({
            attributes: ["roast_id", "roast_name", "roast_description"],
            include: [
                {
                    model: User,
                    attributes: ["user_name"],
                },
                {
                    model: Coffee,
                    attributes: ["coffee_id", "coffee_name", "coffee_roast", "coffee_sweetener"],
                    include: {
                        model: User,
                        attributes: ["user_name"]
                    }
                },
            ],
        });
        res.status(200).json(roastData);
    } catch (err){
        res.status(500).json(err);
    }
});

// GET a single roast
router.get("/:id", async (req, res) => {
    try {
        const roastData = await Roast.findOne({
            attributes: ["roast_id", "roast_name", "roast_description"],
            include: [
                {
                    model: User,
                    attributes: ["user_name"],
                },
                {
                    model: Coffee,
                    attributes: ["coffee_id", "coffee_name", "coffee_roast", "coffee_sweetener"],
                    include: {
                        model: User,
                        attributes: ["user_name"]
                    }
                },
            ],
        });
        res.status(200).json(roastDate);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a roast
router.post("/", async(req, res) => {
    try{
        const roastData = await Roast.create({
            roast_name: req.body.roast_name,
            roast_description: req.body.roast_description,
            user_id: req.session.user_id,
        });
        res.status(200).json(roastData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a roast
router.put("/:id", async(req, res) => {
    Roast.update(req.body, {
        where: {
            id: req.params.id
        },
    }).then(roastData => {
        if(!roastData) {
            res.status(404).json({message: "No roast found with this id!"});
            return;
        }
        res.status(200).json(roastData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// DELETE a roast
router.delete("/:id", async(req, res) =>{
    try {
        const roastData = await Roast.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!roastData) {
            res.status(404).json ({ message: "No roast found with this id!"});
            return;
        }
        res.status(200).json(roastData);
    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;






