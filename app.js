const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars"); //Express Handlebars
const connectDB = require("./config/dbconfig");

//Loading config
dotenv.config({ path: "./config/config.env" });

//Connecting to MongoDB database
connectDB();

//Initializing express app
const app = express();

// Setting up handlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: "main" })); //default layout name and extesnion
app.set("view engine", ".hbs");

//Morgan HTTP Logger in dev environment
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//Setting PORT
const PORT = process.env.PORT || 3000;

// '/' route defined
app.get("/", (req, res) => {
    res.send({ message: "Welcome to my app" });
});

//app listening
app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode and listening on ${PORT}`
    );
});
