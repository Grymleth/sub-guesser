const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middleware/auth");
const axios = require("axios");

// @route GET api/post
// @desc get reddit api config
// @access Private
router.get("/", authMiddleware, (req, res) => {
    console.log("user agent", process.env.REDDIT_USER_AGENT);
    console.log("authorization", req.user.accessToken);
    console.log("jwt", req.header("x-auth-token"));
    const config = {
        headers: {
            "User-Agent": process.env.REDDIT_USER_AGENT,
            "Authorization": "bearer " + req.user.accessToken
        }
    };

    axios.get("https://oauth.reddit.com/best", config)
        .then((response) => {
            // returns the listing array
            res.json(parseListing(response.data));
        })
        .catch((err) => {
            console.log(err.msg);
            res.status(400).json({ msg: "Bad request" });
        });
});

const parseListing = (jsonListing) => {
    posts = jsonListing.data.children.map((child) => {
        return {
            id: child.data.id,
            title: child.data.title,
            selftext: child.data.selftext,
            img: child.data.url,
            author: child.data.author,
            subreddit: child.data.subreddit,
        };
    });

    return posts;
};

module.exports = router;