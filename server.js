// modules
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const session = require("express-session");         
const passport = require("passport");

// test express api
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/api/user");        
const postRoutes = require("./routes/api/post");                                                                                                                                    

const app = express();

// Body parser Middleware
app.use(express.json());

// sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// reddit authentication
app.use("/auth", authRoutes);

// server api
app.use("/api/user", userRoutes);

app.use("/api/post", postRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Not found"});
});

// connect to mongodb
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// port for heroku or 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));