const express = require('express');
const router = express.Router();
const xss = require('xss');
var fs = require('fs');

router.get("/", function (request, response) {

    var obj = JSON.parse(fs.readFileSync('noteData.json', 'utf8'));
    obj.sort(custom_sort);

    function custom_sort(a, b) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    response.render("home", { data: (obj) });
});

router.get("/:note", (req, res) => {
    var noteDetails = [];
    let nwDATA = JSON.parse((fs.readFileSync('noteData.json', 'utf8')));
    for (var i in nwDATA) {
        if ((nwDATA[i].noteTitle) === (req.params.note)) {
            noteDetails.push(nwDATA[i])
            break
        }
    }
    console.log(noteDetails)
    if (!noteDetails || noteDetails[0] === [] || noteDetails[0] === undefined) {
        res.status(404).json("You are trying to fetch a record which is not available in the file!!");
    }
    else
        res.render("individual", { data: noteDetails });
});

module.exports = router;
