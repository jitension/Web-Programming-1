const express = require('express');
const router = express.Router();

router.get("/localstorage", (req, res) => {
    // same HTML for manual dom and jquery dom
    res.render("examples/localstorage", {
        partial: "localstorage-scripts"
    });
});

router.get("*",(req,res) =>{
    res.status(404).json("Invalid URL!!");
})


module.exports = router;