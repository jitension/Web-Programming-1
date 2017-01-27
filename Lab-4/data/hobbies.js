const labCollections = require("../config/labCollections.js");
var uuid = require('node-uuid');
const todoItems = labCollections.hobbies;


let exportsMethod = {

    createHobbies(hobby_name, description) {

        if (!hobby_name || !description)
            return Promise.reject("You must provide a data!");

        else {
            return todoItems().then((inserthobby) => {
                let newHobby = {
                    _id: uuid.v4(),
                    hobby_name: hobby_name,
                    description: description
                };

                return inserthobby
                    .insertOne(newHobby)
                    .then((newInsertInformation) => {
                        if (newInsertInformation == null) {
                            return Promise.reject("unable to add a Education!");
                        }
                        return newInsertInformation.insertedId;
                    })
                    .then((newId) => {
                        return this.gettaskById(newId);
                    });
            });
        }
    },

    gettaskById(id) {
        if (!id) {
            return Promise.reject("You must provide an id to search for");
        }
        return todoItems().then((taskData) => {
            let foundTask = taskData.findOne({ _id: id });
            return foundTask.then((foundornot) => {
                if (foundornot == null) {
                    return Promise.reject("task not found!");
                }
                else {
                    return foundornot;
                }
            });
        });
    },

    getAllHobbies() {
        return todoItems().then((taskData) => {
            return taskData.find({}, { hobby_name: 1, _id: 0 }).toArray();
        });
    },

    getHobbyDescription(params) {
        return todoItems().then((taskData) => {

            return taskData.find({ hobby_name: params }, { hobby_name: 1, description: 1, _id: 0 }).toArray();
        });
    }
}

module.exports = exportsMethod;