const express = require("express");
const router = express.Router();

const redditAPI = require("../../config/redditAPI");

// @route GET api/test
// @desc get reddit api config
// @access Public

// router.get("/", (req, res) => {
//     res.send(redditAPI);
// });

// @rout POST api/test
// @desc returns your post
// @access Public

// router.post("/", (req, res) => {
//     let data = req.body;

//     res.send(data);
// });

module.exports = router;