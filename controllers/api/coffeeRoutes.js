const router = require("express").Router();
const { User, Coffee, Bean, Roast, Sweetener } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all posts
router.get("/", async (req, res) => {
    try {
        const coffeeData = await Coffee.findAll({
            include: [
                { 
                    model: User,
                },
                { 
                    model: Bean, 
                    attributes: ["bean_id", "bean_name", "bean_description", "bean_origin"]
                },
                { 
                    model: Roast, 
                    attributes: ["roast_id", "roast_name", "roast_description"]
                },
                { 
                    model: Sweetener, 
                    attributes: ["sweetener_id", "sweetener_name", "sweetener_description"]
                },
            ],
        });
        res.status(200).json(postData);
    } catch (err){
        res.status(500).json(err);
    }
});

// GET a single post
router.get("/:id", async (req, res) => {
    try {
        const postData = await Post.findOne({
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text"]
                },
            ],
        });
        res.status(200).json(postDate);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a post
router.post("/", async(req, res) => {
    try{
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a post
router.put("/:id", async(req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
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

// DELETE a post
router.delete("/:id", async(req, res) =>{
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!postData) {
            res.status(404).json ({ message: "No post found with this id!"});
            return;
        }
        res.status(200).json(postData);
    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;






