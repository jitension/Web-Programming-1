const express = require('express');
const router = express.Router();
const postHobbies = require("../data/hobbies.js");

router.get("/:hobby", (req, res) => {
    postHobbies.getHobbyDescription(req.params.hobby).then((post) => {
        res.status(200).json(post);
    }).catch((error) => {
        //    Not found!
        res.status(404).json({ message: "Post not found" });
    });
    // x = req.params.school_type;
    // res.json(x);

});

router.get("/", (req, res) => {
    postHobbies.getAllHobbies().then((postList) => {
        res.status(200).json(postList);
    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
    });
});

module.exports = router;