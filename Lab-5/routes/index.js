const recipes = require("./recipe");
const commenting = require("./comments");


const constructorMethod = (app) => {

    app.use("/recipes", recipes);
    app.use("/comments", commenting);


    app.use("*", (req, res) => {
        res.status(404).json({ error: "server Not found" });
    });
};

module.exports = constructorMethod;