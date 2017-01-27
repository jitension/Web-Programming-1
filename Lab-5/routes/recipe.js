const express = require('express');
const router = express.Router();
const postRecipes = require("../data/recipe.js");

router.get("/:id", (req, res) => {
    console.log(req.params);
    postRecipes.getRecipeById(req.params.id).then((post) => {
        res.status(200).json(post);
    }).catch((error) => {
        //    Not found!
        res.status(404).json({ message: "Recipe not found" });
    });
});

router.get("/", (req, res) => {
    postRecipes.getAllRecipes().then((postList) => {
        res.status(200).json(postList);
    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
    });
});

router.post("/", (req, res) => {
    let blogPostRecipe = req.body;
    console.log(blogPostRecipe);

    postRecipes.createRecipe(blogPostRecipe.title, blogPostRecipe.ingredients, blogPostRecipe.steps)
        .then((newPost) => {
            res.json(newPost);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.put("/:id", (req, res) => {
    let updateRecipe = req.body;
    console.log(updateRecipe);
    console.log(req.params);

    if (!updateRecipe) {
        res.status(400).json({ error: "You must provide data to update a recipe" });
        return;
    }

    if (!updateRecipe.title) {
        res.status(400).json({ error: "You must provide a title" });
        return;
    }

    if (!updateRecipe.ingredients) {
        res.status(400).json({ error: "You must provide a ingredients" });
        return;
    }

    if (!updateRecipe.steps) {
        res.status(400).json({ error: "You must provide a steps" });
        return;
    }

    let getRecipe = postRecipes.getRecipeById(req.params.id);
    getRecipe.then((data) => {
        if (!data) {
            return res.status(404).json({ error: "no recipe found!" });
        }
    });

    return postRecipes.updateRecipes(req.params.id, updateRecipe)
        .then((updatedRecipe) => {
            res.json(updatedRecipe);
        }, () => {
            res.sendStatus(500);
        });
});

router.delete("/:id", (req, res) => {
    console.log(req.params.id);


    return postRecipes.removePost(req.params.id)
        .then(() => {
            res.sendStatus(200);
        }, () => {
            res.status(404).json({ error: "no data found!!" });
        })
        .catch((e) => {
            res.status(500).json({ error: e });
        });
});

module.exports = router;