const express = require('express');
const router = express.Router();
const data = require("../data");
const textmanipulation = data.textmanipulation;

router.get("/clientform", (req, res) => {
	
    res.render("manipulation/static", {});
});

router.get("/serverform", (req, res) => {
    res.render("manipulation/server", {});
});

router.post("/serverform", (req, res) => {
   
    let result;
	
	let mainText = req.body.String1;
	let inputText = req.body.String2;
	let freq = parseInt(req.body.number1);
	let wordcount = parseInt(req.body.number2);
	
    try {
		
        result = textmanipulation.updateText(mainText,inputText,freq,wordcount);     
     
    } catch (e) {
        res.render("manipulation/server", { mainText: mainText, inputText: inputText, freq: freq, wordcount: wordcount,error: e });
        return;
    }

    res.render("manipulation/server", { mainText: mainText, inputText: inputText, freq: freq, wordcount: wordcount, result: result });
});

module.exports = router;