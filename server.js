// express import
const express = require("express");

// test express api
const test = require("./routes/api/test");

const app = express();

// Body parser Middleware
app.use(express.json());

// use routes
app.use("/api/test", test);

// port for heroku or 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

