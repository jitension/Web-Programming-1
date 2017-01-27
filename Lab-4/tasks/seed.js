const dbConnection = require("G:\\Web Programming\\assignment4\\final_assignment\\config\\labConnection.js");
const education = require("G:\\Web Programming\\assignment4\\final_assignment\\data\\education.js");
const hobbies = require("../data/hobbies.js");
const classes = require("../data/classes.js");


dbConnection().then(db => {
    return education.createEducation("MIt", "undergrad", "EXTX")
        .then((phil) => {
            const id = phil._id;

            return phil;
        })
        .then((data) => {
            return hobbies.createHobbies("wallyball", "catcher")
                .then((data) => {
                    const id = data._id;

                    return data;
                })
        })
        .then((data) => {
            return classes.createClass("data structiure", "532", "Prof. ZXS", "data structures ")
                .then((data) => {
                    const id = data._id;

                    return data;
                })
        })

        .then(() => {
            console.log("Done seeding database");
            db.close();
        });

}, (error) => {
    console.error(error);
});
