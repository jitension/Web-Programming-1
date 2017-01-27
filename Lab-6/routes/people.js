const express = require('express');
const router = express.Router();
const data = require("../data");
const peopleData = require("../data/people");
const eventData = require("../data/events");
// Single Person Page

router.get("/:id", (req, res) => {
    peopleData.getPerson(Number(req.params.id))
    .then(person => {
        return person;
    }).then((person)=>{
        return eventData.getEventsForAttendee(person.id).then(eventList => {
	    	        return [person,eventList];
                });
    }).then(list=>{
            res.render('people/single', {person: list[0], eventList: list[1]});
    }).catch((error)=>{
     res.status(500).json({ error: error });
    });

});

// People Index Page
router.get("/", (req, res) => {
    // Display a list of all people; it can be in an unordered list, or a table
    // Each of these people need to link to the single person page

    peopleData.getAllPeople().then((data) => {
        res.render("people/index", { people: data });
    }).catch((error) => {
        res.status(500).json({ error: error });
    });

    //  res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;