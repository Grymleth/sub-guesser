const express = require('express');
const router = express.Router();
// user model
const User = require('../../models/User');

const jwt = require('jsonwebtoken');

// @route   GET api/user
// @desc    Get user info
// @access  Public
router.get('/', (req, res) => {
    if(req.user){
        res.json(req.user);
    }
    else{
        res.status(401).json({ msg: "Unauthorized" });
    }
});

module.exports = router;