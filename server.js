if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

app.set("view engine", "ejs"); // view engine we use
app.set("views", __dirname + "/views"); // tell the dir
app.set("layout", "layouts/layout"); // tell where the view layouts
app.use(expressLayouts); // tell app to use expressLay
app.use(express.static("public")); // tell where public view is

// set db after the app
const mongoose = require("mongoose"); // import from downloaded
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); // connect environment database. have to set up the url locally in .env file so that when deploy this web ccdan connect server on website

const db = mongoose.connection; // log wehter connect or not
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose")); // when open up, just connect first time once.

app.use("/", indexRouter); //routes/index/body(index.ejs)
app.use("/authors", authorRouter); // all authorRouter prepend 'authors'

app.listen(process.env.PORT || 3000);