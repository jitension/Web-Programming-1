const express = require('express');
const router = express.Router();
const data = require("../data");

const locationData = data.locations;
const eventData = data.events;


router.get("/:id", (req, res) => {
    // Find a location by the provided id, 

    let locationId = Number(req.params.id);
    // then display its information

    var locationDetails = [];
    var newArray = [];
    locationData.getLocation(locationId).then((singleData) => {
        locationDetails = singleData;

        let eventLocation = eventData.getAllEvents();

        eventLocation.then((data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].location === locationId)
                    newArray.push(data[i]);
            }
            return newArray;
        })
            .then((data) => {
                locationDetails["eventDetails"] = newArray;
            });

        res.render('locations/single', { locations: locationDetails });
    }).catch(() => {

        res.status(404).json({ error: "Location not found" })
    });

    //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// Location Index Page


router.get("/", (req, res) => {
    // Display a list of all locations; it can be in an unordered list, or a table
    // Each of these locations need to link to the single location page

    locationData.getAllLocations().then((allData) => {
        res.render('locations/index', { locations: allData });
    }).catch((error) => {
        res.status(500).json({ error: error });
    });



    // res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;