const connection = require("./labConnection");
const todo = require("./todo");

let firstTask = todo.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");

let displayFirstTask = firstTask.then((newTask) => {
    console.log("task one added!");
    console.log(newTask);
    return newTask;
});

let secondTask = displayFirstTask.then((newTask) => {
    return todo.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
});

let queryAllTasks = secondTask.then(() => {
    console.log("Fetching all the tasks ......");
    return todo.getAllTasks();
});

let displayAllTasks = queryAllTasks.then((displayTask) => {
    console.log(displayTask);
    return displayTask;
});

let removeFirstTask = displayAllTasks.then((tasks) => {
    console.log("Removing first task......");
    console.log(tasks[0]._id);
    return todo.removeTask(tasks[0]._id);
    // return displayFirstTask.then((display) => {
    //   console.log(display._id);
    // return todo.removeTask(display._id);
    //  });
});

let queryAllTasksAgain = removeFirstTask.then(() => {
    console.log("Fetching all the tasks ......");
    return todo.getAllTasks();
});

let displayAllTasksAgain = queryAllTasksAgain.then((displayTask) => {
    console.log(displayTask);
    return displayTask;
});

let completeRemainingTasks = displayAllTasksAgain.then((completeTask) => {
    console.log("Completing remaining tasks:....");
    for (let i = 0; i < completeTask.length; i++) {
        todo.completeTask(completeTask[i]._id);
    }
    return;
});

let getAlltasksafterupdate = completeRemainingTasks.then((alltasks) => {
    console.log("Fetching tasks ......");
    return todo.getAllTasks();
});

let taskReceivedafterUpdate = getAlltasksafterupdate.then((alltask) => {
    console.log("Updated tasks are:...");
    console.log(alltask);
    return alltask;
});

let errordata = taskReceivedafterUpdate.catch((error) => {
    console.log(error);
    return error;
});

errordata.catch().then(() => {
    return connection();
}).then((db) => {
    return db.close();
});
