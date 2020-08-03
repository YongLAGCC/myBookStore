const express = require("express");
const router = express.Router();

//all authors router
router.get("/", (req, res) => {
  res.render("authors/index");
});

//new author router
router.get("/new", (req, res) => {
  res.render("authors/new");
});
//create author router
router.post("/", (req, res) => {
  res.send("Create");
});

module.exports = router;
