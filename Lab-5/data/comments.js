const labCollections = require("../config/labCollections.js");
var uuid = require('node-uuid');
const todorecipe = labCollections.recipe;
const recipes = require("./recipe");

let exportsMethod = {

    getAllComments(id) {

        if (id == undefined)
            return Promise.reject("Please provide id to get recepie");
        return todorecipe().then((taskData) => {
            return taskData.find({ _id: id }, { comments: 1, title: 1 }).limit(1).toArray().then(function (recepieList) {
                if (recepieList.length == 0) return Promise.reject("comment with following id could not be found " + id);
                return recepieList[0];

            });
        });
    },

    getAllCommentsByCommentId(id) {

        return todorecipe().then((taskData) => {
            return taskData.find({ 'comments._id': id }, { comments: { $elemMatch: { _id: id } }, title: 1 }).toArray().then(function (recepieList) {
                if (recepieList.length == 0) return Promise.reject("comment with following id could not be found " + id);

                return recepieList[0];

            });

        });
    },

    createComment(id, poster, comment) {
        if (!poster && !comment)
            return Promise.reject("You must provide an poster and comment to perform update operation!");

        console.log(poster, comment, id);
        return todorecipe().then((commentData) => {
            var x = uuid.v4();
            let updateComment = {
                $addToSet:
                {
                    comments: {
                        _id: x,
                        poster: poster,
                        comment: comment
                    }
                }
            };

            return commentData.updateOne({
                _id: id
            }, updateComment).then(() => {
                return this.getAllCommentsByCommentId(x);
            }, (err) => {
                return Promise.reject("Cannot update this comment");
            });
        });

    },

    removeComment(id) {


        return todorecipe().then((taskData) => {

            return taskData.update({ 'comments._id': id }, { $pull: { 'comments': { '_id': id } } })
                .then(() => {
                    return "Comment Deleted!";
                }, (err) => {
                    return Promise.reject("Cannot delete this comment");
                });
        });

    },

    updateSpecificComment(idOfRecipe, idOfComment, dataOfPoster, dataOfComment) {
        console.log(dataOfComment, dataOfPoster);
        return todorecipe().then((data) => {

            if (!dataOfComment && !dataOfPoster) {
                return data.update({ _id: idOfRecipe, 'comments._id': idOfComment }, {
                    $set: {
                        'comments.$.poster': dataOfPoster, 'comments.$.comment': dataOfComment
                    }
                }).then(() => {
                    return this.getAllCommentsByCommentId(idOfComment);

                });
            }

            else if (dataOfComment && dataOfPoster == undefined) {
                return data.update({ _id: idOfRecipe, 'comments._id': idOfComment }, {
                    $set: {
                        'comments.$.comment': dataOfComment
                    }
                }).then(() => {
                    return this.getAllCommentsByCommentId(idOfComment);

                });
            }
            else {
                return data.update({ _id: idOfRecipe, 'comments._id': idOfComment }, {
                    $set: {
                        'comments.$.poster': dataOfPoster
                    }
                }).then(() => {
                    return this.getAllCommentsByCommentId(idOfComment);

                });
            }
        });
    }

}

module.exports = exportsMethod;