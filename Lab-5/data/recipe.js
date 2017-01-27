const labCollections = require("../config/labCollections.js");
var uuid = require('node-uuid');
const todorecipe = labCollections.recipe;

let exportsMethod = {

    createRecipe(title, ingredients = [], steps) {

        if (!title || !ingredients || !steps) {
            return Promise.reject("You must provide a data!");
        }


        else {
            return todorecipe().then((insertRecipe) => {

                let newRecipe = {
                    _id: uuid.v4(),
                    title: title,
                    ingredients: ingredients,
                    steps: steps,
                    comments: [],
                };
                return insertRecipe
                    .insertOne(newRecipe)
                    .then((newInsertInformation) => {
                        if (newInsertInformation == null) {
                            return Promise.reject("unable to add a Recipe!");
                        }
                        return newInsertInformation.insertedId;
                    })
                    .then((newId) => {
                        return this.getRecipeById(newId);
                    });
            });
        }
    },

    getRecipeById(id) {
        if (!id) {
            return Promise.reject("You must provide an id to search for");
        }
        return todorecipe().then((taskData) => {
            let foundRecipe = taskData.findOne({ _id: id });
            return foundRecipe.then((foundornot) => {
                if (foundornot == null) {
                    return Promise.reject("Recipe not found!");
                }
                else {
                    return foundornot;
                }
            });
        });
    },

    getAllRecipes() {
        return todorecipe().then((taskData) => {
            return taskData.find({}, { title: 1 }).toArray();
        });
    },

    updateRecipes(recipeId, data) {
        if (!recipeId && !data)
            return Promise.reject("You must provide an id or data to perform update operation!");


        return todorecipe().then((todoitemsRecipe) => {
            console.log(data.comments);
            let updateRecipe = {
                $set:
                {
                    title: data.title,
                    ingredients: data.ingredients,
                    steps: data.steps,
                    comments: data.comments
                }
            };

            return todoitemsRecipe.updateOne({
                _id: recipeId
            }, updateRecipe).then(() => {
                return this.getRecipeById(recipeId);
            }, (err) => {
             return  Promise.reject("Cannot update this recipe");
            });
        });

    },

    removePost(id) {
        return todorecipe().then((recipeCollection) => {
            return recipeCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                 return  Promise.reject(`Could not delete user with id of ${id}`);
                }
            });
        });
    }

}

module.exports = exportsMethod;