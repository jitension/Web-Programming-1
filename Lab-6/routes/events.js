const express = require('express');
const router = express.Router();
const data = require("../data");
const eventData = require("../data/events.js");
const peopleData = require("../data/people.js");
const locationData = require("../data/locations.js");

// Single Event Page
router.get("/:id", (req, res) => {
    // Find a event by the provided id, 
    // then display its information
    // As well as listing the names of all the attendees that will be at this event 
    // Each of these attendee names will need to link to their person page
    // You will also list the location of the event, said location's name, and a link to the location page
    let tempID = Number(req.params.id);


    var eventDetails = [];
    var newArray = [];
    eventData.getEvent(tempID).then((event) => {
        eventDetails = event;

        let attendeeNames = peopleData.getAllPeople();

        attendeeNames.then((data) => {
            for (let i = 0; i < eventDetails.attendees.length; i++)
                for (let j = 0; j < data.length; j++)
                    if (data[j].id === eventDetails.attendees[i])
                        newArray.push(data[j]);
            return newArray;
        })
            .then(() => {
                eventDetails["attendeesName"] = newArray;
            });


        let LocationByEvent = locationData.getLocation(event.location);


        LocationByEvent.then((data) => {
            event["locationData"] = data;
        });



        //  console.log(event);
        res.render('events/single', { event: event });
        //  res.render('../views/Events/single', { event: personNames });

    }).catch(() => {
        res.status(404).json({ error: "event not found" });
    });



    // If a event is not found, display the 404 error page
    // res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// Event Index Page
router.get("/", (req, res) => {
    // Display a list of all events; it can be in an unordered list, or a table
    // Each of these events need to link to the single event page


    eventData.getAllEvents().then((event) => {
        //  console.log(event);
        res.render('events/index', { event: event });
    }).catch(() => {
        res.status(404).json({ error: "event not found" });
    });

    // res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;