const labCollections = require("../config/labCollections.js");
var uuid = require('node-uuid');
const todoItems = labCollections.education;


let exportsMethod = {

    createEducation(school_name, school_type, degree) {

        if (!school_name || !school_type)
            return Promise.reject("You must provide a data!");

        else {
            return todoItems().then((insertEdu) => {
                let newEdu = {
                    _id: uuid.v4(),
                    school_name: school_name,
                    school_type: school_type,
                    degree: degree,
                };

                return insertEdu
                    .insertOne(newEdu)
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

    getAllEducation() {
        return todoItems().then((taskData) => {
            return taskData.find({}, { school_name: 1, _id: 0 }).toArray();
        });
    },

    getAllHighSchool(params) {
        return todoItems().then((taskData) => {
            if (params == "highschool") {
                return taskData.find({ school_type: params }, { school_name: 1, _id: 0 }).toArray();
            }
            if (params == "undergrad") {
                return taskData.find({ school_type: "undergrad" }, { school_name: 1, degree: 1, _id: 0 }).toArray();
            }
        });
    }
}

module.exports = exportsMethod;