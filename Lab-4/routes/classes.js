const express = require('express');
const router = express.Router();
const postClass = require("../data/classes.js");

router.get("/:xyz", (req, res) => {
    console.log(req.query);
        postClass.getClassDescription(req.query.code).then((post) => {
            res.status(200).json(post);
        }).catch((error) => {
       //    Not found!
            res.status(404).json({ message: "Post not found" });
        });  
});

router.get("/", (req, res) => {
    postClass.getAllClasses().then((postList) => {
        res.status(200).json(postList);
    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
    });
});

module.exports = router;