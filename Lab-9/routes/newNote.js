const express = require('express');
const router = express.Router();
const xss = require('xss');
var fs = require('fs');

router.get("/", function (request, response) {
    response.render("newForm", {});
});

router.post("/save", function (request, response) {
    //var data = [];
    var noteTitleTemp = request.body.noteTitle;
    console.log(request.body);
    var data = (request.body);

    let newData = {
        noteTitle: xss(data.noteTitle),
        dueDate: xss(data.dueDate),
        summary: xss(data.summary),
        noteBody: xss(data.noteBody)
    };

    var result = [];

    var nwDATA = JSON.parse(fs.readFileSync('noteData.json', 'utf8'));

    function custom_sort(a, b) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }

    for (var i in nwDATA)
        result.push(nwDATA[i]);
    result.push(newData);

    result.sort(custom_sort);

    console.log(result)
    fs.writeFileSync("noteData.json", JSON.stringify(result), "UTF-8", { 'flags': 'a+' });
    response.json({ success: true, "redirect": true, "redirect_url": "/" + noteTitleTemp });

});


module.exports = router;