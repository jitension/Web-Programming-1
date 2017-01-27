const express = require('express');
const router = express.Router();
const xss = require('xss');
var fs = require('fs');


router.post("/nextnode", (req, res) => {
    delete noteDetails;
    var noteDetails = [];
    let nwDATA = JSON.parse(fs.readFileSync('noteData.json', 'utf8'));
    nwDATA.sort(custom_sort);

    function custom_sort(a, b) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }

    for (var i in nwDATA)
        if (nwDATA[i].dueDate == req.body.date) {
            noteDetails.push(nwDATA[++i])
            break
        }
    if (noteDetails[0] == undefined) {
        res.json({ success: false })
    }
    else
        res.json({ success: true, "redirect": false, "data": noteDetails[0] });

});

module.exports = router;