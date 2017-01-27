const labCollections = require("./labCollections");
var uuid = require('node-uuid');
const todoItems = labCollections.todoItems;

let exportedMethods =
    {
        createTask(title, description) {

            if (!title || !description)
                return Promise.reject("You must provide a title and description to create a task!");

            else {
                return todoItems().then((taskCollection) => {
                    let newTask = {
                        _id: uuid.v4(),
                        title: title,
                        description: description,
                        completed: false,
                        completedAt: null
                    };

                    return taskCollection
                        .insertOne(newTask)
                        .then((newInsertInformation) => {
                            if (newInsertInformation == null) {
                                return Promise.reject("unable to create a task!");
                            }
                            return newInsertInformation.insertedId;
                        })
                        .then((newId) => {
                            return this.gettaskById(newId);
                        });
                });
            }

        },

        getAllTasks() {
            return todoItems().then((taskData) => {
                return taskData.find().toArray();
            });
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

        completeTask(taskId) {
            if (!taskId)
                return Promise.reject("You must provide an id to perform update operation!");


            return todoItems().then((todoitemscollection) => {
                let updateitem = {
                    $set:
                    {
                        completed: true,
                        completedAt: new Date()
                    }
                };

                return todoitemscollection.updateOne({
                    _id: taskId
                }, updateitem).then(() => {
                    return this.gettaskById(taskId);
                }, (err) => {
                    Promise.reject("Cannot update this item");
                });
            });

        },

        removeTask(id) {
            if (!id)
                return Promise.reject("You must provide an id to search for");
            else {
                console.log("deleting....");
                return todoItems().then((taskCollection) => {

                    return taskCollection
                        .removeOne({ _id: id })
                        .then((deletionInfo) => {
                            if (deletionInfo.deletedCount === 0) {
                                throw (`Could not delete task with id of ${id}`)
                            }
                            return deletionInfo;
                        });
                });
            }
        }
    }

module.exports = exportedMethods;