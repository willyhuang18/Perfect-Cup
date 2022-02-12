const router = require("express").Router();
const { Sweetener } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all sweeteners
router.get("/", async (req, res) => {
    try {
        const sweetenerData = await Sweeteners.findAll({
            attributes: ["sweetener_id", "sweetener_name", "sweetener_description", "sweetener_origin"],
            include: [
                /*
                {
                    model: User,
                    attributes: ["user_name"],
                },
                {
                    model: Coffee,
                    attributes: ["coffee_id", "coffee_name", "coffee_sweetener", "coffee_sweetener"],
                    include: {
                        model: User,
                        attributes: ["user_name"]
                    }
                },
                */
            ],
        });
        res.status(200).json(sweetenerData);
    } catch (err){
        res.status(500).json(err);
    }
});

// GET a single sweetener
router.get("/:id", async (req, res) => {
    try {
        const sweetenerData = await Sweetener.findOne({
            attributes: ["sweetener_id", "sweetener_name", "sweetener_description", "sweetener_origin"],
            include: [
                /*
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
                */
            ],
        });
        res.status(200).json(sweetenerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a sweetener
router.post("/", async(req, res) => {
    try{
        const sweetenerData = await Sweetener.create({
            sweetener_name: req.body.sweetener_name,
            sweetener_description: req.body.sweetener_description,
            sweetener_origin: req.body.sweetener_origin,
            user_id: req.session.user_id,
        });
        res.status(200).json(sweetenerData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a sweetener
router.put("/:id", async(req, res) => {
    Sweetener.update(req.body, {
        where: {
            id: req.params.id
        },
    }).then(sweetenerData => {
        if(!sweetenerData) {
            res.status(404).json({message: "No sweetener found with this id!"});
            return;
        }
        res.status(200).json(sweetenerData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// DELETE a sweetener
router.delete("/:id", async(req, res) =>{
    try {
        const sweetenerData = await Sweetener.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!sweetenerData) {
            res.status(404).json ({ message: "No sweetener found with this id!"});
            return;
        }
        res.status(200).json(sweetenerData);
    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;






