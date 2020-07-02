const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const exphbs = require("express-handlebars"); //Express Handlebars
const passport = require("passport");
const connectDB = require("./config/dbconfig");

//Loading config
dotenv.config({ path: "./config/config.env" });

//Passport strategy config
require("./config/passport")(passport);

//Connecting to MongoDB database
connectDB();

//Initializing express app
const app = express();

//Static folder
app.use(express.static(path.join(__dirname, "public")));

//Morgan HTTP Logger in dev environment
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//Setting PORT
const PORT = process.env.PORT || 3000;

// Setting up handlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: "hbs" })); //default layout name and extesnion for hadnlebar file
app.set("view engine", ".hbs"); //setting handlebar as view engine for express app

//Sessions
app.use(
    session({
        secret: "A9qbSrt-%tY098",
        resave: false,
        saveUninitialized: false,
    })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Using Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

//app listening
app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode and listening on ${PORT}`
    );
});
