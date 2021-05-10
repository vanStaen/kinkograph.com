const express = require("express");
const router = express.Router();

// Check if code used for Login is correct
router.get("/", async (req, res) => {   
    try {
        if (req.param.code === process.env.ACCESS_CODE) {        
            res.status(201).json("Access Granted");
        } else {
            res.status(401).json({
                error: "Unauthorized",
            });
        }    
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});

module.exports = router;