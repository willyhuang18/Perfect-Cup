const router = require("express").Router();
const { Bean } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all beans
router.get("/", async (req, res) => {
    try {
        const beanData = await Bean.findAll({
            attributes: ["bean_id", "bean_name", "bean_description", "bean_origin"],
        });
        res.status(200).json(beanData);
    } catch (err){
        res.status(500).json(err);
    }
});

// GET a single bean
router.get("/:id", async (req, res) => {
    try {
        const beanData = await Bean.findOne({
            attributes: ["bean_id", "bean_name", "bean_description", "bean_origin"],
        });
        res.status(200).json(beanDate);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a bean
router.post("/", async(req, res) => {
    try{
        const beanData = await Bean.create({
            bean_name: req.body.bean_name,
            bean_description: req.body.bean_description,
            bean_origin: req.body.bean_origin,
            user_id: req.session.user_id,
        });
        res.status(200).json(beanData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a bean
router.put("/:id", async(req, res) => {
    Bean.update(req.body, {
        where: {
            id: req.params.id
        },
    }).then(beanData => {
        if(!beanData) {
            res.status(404).json({message: "No bean found with this id!"});
            return;
        }
        res.status(200).json(beanData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// DELETE a bean
router.delete("/:id", async(req, res) =>{
    try {
        const beanData = await Bean.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!beanData) {
            res.status(404).json ({ message: "No bean found with this id!"});
            return;
        }
        res.status(200).json(beanData);
    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;






