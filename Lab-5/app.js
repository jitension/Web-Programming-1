const express = require("express");
let configRoutes = require("./routes");
const bodyParser = require("body-parser");
let app = express();

app.use(bodyParser.json());
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});