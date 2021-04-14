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
    callbackURL: redirectURI,
    scope: "read"
}, (accessToken, refreshToken, profile, done) => {
    // find user
    User.findOne({ redditID: profile.id }).then((currentUser) => {
        if(currentUser){
            user = {
                id: currentUser.id,
                name: currentUser.username,
                redditID: currentUser.redditID,
                accessToken,
                refreshToken
            }
            return done(null, user);
        }
        else{
            new User({
                redditID: profile.id,
                username: profile.name
            }).save().then((newUser) => {
                user = {
                id: currentUser.id,
                name: currentUser.name,
                redditID: currentUser.redditID,
                accessToken,
                refreshToken
            }
                return done(null, user);
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
            successRedirect: "http://localhost:3000",
            failureRedirect: "http://localhost:3000"
        })(req, res, next);
    }
    else{
        console.log("state is not the same");
    }
});

module.exports = router;