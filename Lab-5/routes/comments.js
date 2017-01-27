const express = require('express');
const router = express.Router();
const todocomments = require("../data/comments.js");


router.get("/recipe/:recipeId", function (req, res) {
    let recipeId = req.params.recipeId;
    todocomments.getAllComments(recipeId).then(function (data) {
        let commentList = data.comments;
        var newList = { comments: [] };
        var addcomment = function (id, comment, poster) {
            let newCommentFormat = { _id: id, recipeId: data._id, recipeTitle: data.title, name: comment, poster: poster };

            newList.comments.push(newCommentFormat);

        };

        for (let i = 0; i < commentList.length; i++) {
            addcomment(commentList[i]._id, commentList[i].comment, commentList[i].poster);
        }

        res.status(200).json(newList);
    }, function (errorMessage) {
        res.status(500).json({ error: errorMessage });
    });
});



router.get("/:recipeId", function (req, res) {
    let recipeId = req.params.recipeId;
    todocomments.getAllCommentsByCommentId(recipeId).then(function (data) {
        let commentList = data.comments;
        var newList = { comments: [] };
        var addcomment = function (id, comment, poster) {
            let newCommentFormat = { _id: id, recipeId: data._id, recipeTitle: data.title, name: comment, poster: poster };

            newList.comments.push(newCommentFormat);

        };

        addcomment(commentList[0]._id, commentList[0].comment, commentList[0].poster);

        res.status(200).json(newList);
    }, function (errorMessage) {
        res.status(500).json({ error: errorMessage });
    });
});


router.post("/:recipeId", (req, res) => {
    let dataComment = req.body;

    todocomments.createComment(req.params.recipeId, dataComment.poster, dataComment.comment)
        .then((newPost) => {
            res.json(newPost);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.delete("/:id", (req, res) => {

    return todocomments.removeComment(req.params.id)
        .then((data) => {
            res.json(data);

        }, () => {
            res.status(404).json({ error: "no comment found!!" });
        })
        .catch((e) => {
            res.status(500).json({ error: e });
        });
});


router.put("/:idRecipe/:idComment", (req, res) => {
    let updatedComment = req.body;

    return todocomments.updateSpecificComment(req.params.idRecipe, req.params.idComment, updatedComment.poster, updatedComment.comment)
        .then((taskData) => {
            res.json(taskData);
        }, () => {
            res.sendStatus(500);
        });
});



module.exports = router;