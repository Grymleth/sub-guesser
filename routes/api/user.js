const express = require("express");
const router = express.Router();
// user model
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middleware/auth");

// @route   GET api/user
// @desc    Get user info
// @access  Public
router.get("/", (req, res) => {
    if(req.user){
        jwt.sign(
            {
                id: req.user.id,
                accessToken: req.user.accessToken,
                refreshToken: req.user.refreshToken
            },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                res.json({
                    token: token,
                    user: {
                        id: req.user.id,
                        name: req.user.name,
                    }
                });
            }
        );
    }
    else{
        res.status(401).json({ msg: "Unauthorized" });
    }
});

router.get("/logout", authMiddleware, (req, res) => {
    req.session.destroy((error) => {
        res.status(200).json({ msg: "successfully logged out" });
    })
});

module.exports = router;