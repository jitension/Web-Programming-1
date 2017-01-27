const textmanipulation = require("./textman");

const constructorMethod = (app) => {
    
	app.use("/manipulation", textmanipulation);

    app.use("*", (req, res) => {
        res.redirect("/manipulation/clientform");
    })
};

module.exports = constructorMethod;