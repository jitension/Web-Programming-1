const noteListRoutes = require("./noteList");
const newNoteRoutes = require("./newNote");
const newNextAPI = require("./nextData");

const constructorMethod = (app) => {
    app.use('/next', newNextAPI);
    app.use('/new', newNoteRoutes);
    app.use('/', noteListRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;