const router = require("express").Router();
const crypto = require("crypto");
const axios = require("axios");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { resolveNaptr } = require("dns");

const redirectURI = "http://localhost:5000/auth/reddit/callback"

// reddit authentication
// https://ssl.reddit.com/api/v1/authorize?duration=permanent&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Freddit%2Fcallback&scope=identity&state=8da245e5e6887ddb479f1f36422c968dc22bf40d828eb9f43c569e682725c067&client_id=cHjqiiLBqNVkfQ
router.get("/reddit", (req, res, next) => {
    req.session.redditState = crypto.randomBytes(32).toString("hex");
    const rootURL = "https://ssl.reddit.com/api/v1/authorize";
    const options = {
        client_id: process.env.REDDIT_CLIENT_ID,
        response_type: "code",
        state: req.session.redditState,
        redirect_uri: redirectURI,
        duration: "permanent",
        scope: "identity"
    };

    return res.redirect(`${rootURL}?${querystring.stringify(options)}`);
});

// reddit redirect
router.get("/reddit/callback", (req, res, next) =>{
    console.log(req.query);
    
    if(req.session.redditState == req.query.state){
        const authorization = Buffer.from("cHjqiiLBqNVkfQ:16yWFsGVzxdh0Cm73QpZYrlIh8U-ZQ").toString("base64");
        const rootURL = "https://www.reddit.com/api/v1/access_token";
        const data = {
            grant_type: "authorization_code",
            code: req.query.code,
            redirect_uri: redirectURI
        };

        const config = {
            headers: {
                "Authorization": `Basic ${authorization}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        axios.post(rootURL, querystring.stringify(data), config)
            .then((result) => {
                console.log(result.data);
                config.headers.Authorization = `bearer ${result.data.access_token}`;

                axios.get("https://oauth.reddit.com/api/v1/me", config)
                    .then((result) => {
                        console.log(result.data);
                        res.send(result.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                res.send(err.message);
            });
    }
});

module.exports = router;