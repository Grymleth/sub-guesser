// modules
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

// test express api
const auth = require("./routes/auth");
const session = require("express-session");                                                                                                                                                     

const app = express();

// Body parser Middleware
app.use(express.json());

// sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// reddit authentication
app.use("/auth", auth);

app.use((req, res) => {
    res.status(404);
    res.json({ error: "Not found"});
});

// connect to mongodb
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// port for heroku or 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));