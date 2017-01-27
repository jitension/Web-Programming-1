const express = require('express');
const router = express.Router();
const postEducation = require("../data/education.js");

router.get("/:school_type", (req, res) => {
    postEducation.getAllHighSchool(req.params.school_type).then((post) => {
        res.status(200).json(post);
    }).catch((error) => {
        //    Not found!
        res.status(404).json({ message: "Post not found" });
    });
    // x = req.params.school_type;
    // res.json(x);

});

router.get("/", (req, res) => {
    postEducation.getAllEducation().then((postList) => {
        res.status(200).json(postList);
    }).catch((error) => {
        // Something went wrong with the server!
        res.status(500).send();
    });
});

module.exports = router;