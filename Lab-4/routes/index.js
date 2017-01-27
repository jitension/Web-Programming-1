const educationroutes = require("./education");
const hobbiesroutes = require("./hobbies");
const classesroutes = require("./classes");

const constructorMethod = (app) => {
    app.use("/education", educationroutes);
   app.use("/hobbies", hobbiesroutes);
    app.use("/classes", classesroutes);

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};

module.exports = constructorMethod;