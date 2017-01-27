const labCollections = require("../config/labCollections.js");
var uuid = require('node-uuid');
const todoItems = labCollections.classes;


let exportsMethod = {

    createClass(course_name, course_code, professor, description) {

        if (!course_name || !course_code || !professor || !description)
            return Promise.reject("You must provide a data!");

        else {
            return todoItems().then((insertclass) => {
                let newClass = {
                    _id: uuid.v4(),
                    course_name: course_name,
                    course_code: course_code,
                    professor: professor,
                    description: description
                };

                return insertclass
                    .insertOne(newClass)
                    .then((newInsertInformation) => {
                        if (newInsertInformation == null) {
                            return Promise.reject("unable to add a class!");
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

    getAllClasses() {
        return todoItems().then((taskData) => {
            return taskData.find({}, { course_code: 1, _id: 0 }).toArray();
        });
    },

    getClassDescription(params) {
        return todoItems().then((taskData) => {

            return taskData.findOne({ course_code: params });
        });
    }
}

module.exports = exportsMethod;