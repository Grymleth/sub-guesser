const router = require("express").Router();
const crypto = require("crypto");
const axios = require("axios");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const passport = require("passport");
const RedditStrategy = require("passport-reddit").Strategy;

const redirectURI = "http://localhost:5000/auth/reddit/callback"

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new RedditStrategy({
    clientID: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_SECRET,
    callbackURL: redirectURI
}, (accessToken, refreshToken, profile, done) => {
    // find user
    User.findOne({ redditID: profile.id }).then((currentUser) => {
        if(currentUser){
            return done(null, { profile: currentUser, accessToken });
        }
        else{
            new User({
                redditID: profile.id,
                username: profile.name
            }).save().then((newUser) => {
                return done(null, { profile: newUser, accessToken });
            })
        }
    })
}))

router.get("/test", (req, res, next) => {
    const token = req.header("x-auth-token");
    console.log(token);
    res.send(token);
})

// reddit authentication
// https://ssl.reddit.com/api/v1/authorize?duration=permanent&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Freddit%2Fcallback&scope=identity&state=8da245e5e6887ddb479f1f36422c968dc22bf40d828eb9f43c569e682725c067&client_id=cHjqiiLBqNVkfQ
router.get("/reddit", (req, res, next) => {
    req.session.redditState = crypto.randomBytes(32).toString("hex");
    passport.authenticate("reddit", {
        state: req.session.redditState,
        duration: "permanent",
    })(req, res, next);
});

// reddit redirect
router.get("/reddit/callback", (req, res, next) =>{
    if(req.query.state == req.session.redditState){
        passport.authenticate("reddit", {
            successRedirect: "/api/user"
        })(req, res, next);
    }
    else{
        console.log("state is not the same");
    }
});

module.exports = router;