const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middleware/auth");
const axios = require("axios");

// @route GET api/post
// @desc get reddit api config
// @access Private
router.get("/", authMiddleware, (req, res) => {
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
            console.log(err);
            res.status(469).json({ msg: "Bad request" });
        });

    // res.json(asyncFunc());
});

router.get("/test", (req, res) => {
    
    axios.get("https://api.reddit.com/api/info/?id=t3_ms080x,t3_ms1n6f,t3_ms1m0z,t3_msbw6s")
        .then((response) => {
            res.json(parseListing(response.data))
        })
        .catch((err) => {
            res.status(400).json({ msg: err.response});
        });
}) 

const parseListing = (jsonListing) => {
    let count = 0;
    posts = jsonListing.data.children.map((child) => {
        const url = child.data.url;
        let media = "";
        let type = "";

        console.log("post", count++);

        if(url.includes("https://i.redd.it")){
            media = url;
            type = "image";
        }
        else if(url.includes("https://v.redd.it")){
            media = child.data.secure_media.reddit_video.fallback_url;
            type = "video";
        }
        else if(url.includes("www.reddit")){
            media = null;
            type = "normal";
        }
        else{
            media = null;
            type = "external";
        }

        return {
            id: child.data.id,
            // title: child.data.title,
            title: `${child.data.title}`,
            selftext: child.data.selftext,
            media: media,
            author: child.data.author,
            url: url,
            subreddit: child.data.subreddit,
            type: type
        };
    });

    return posts;
};

module.exports = router;