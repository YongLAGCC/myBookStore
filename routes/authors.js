const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//all authors router
router.get("/", (req, res) => {
  res.render("authors/index");
});

//new author router
router.get("/new", (req, res) => {
  res.render("authors/new", { author: Author() });
});
//create author router
router.post("/", (req, res) => {
  const author = new Author({
    name: req.body.name,
    // 确定传的参是 name， 不是id 或其他
  });
  author.save((err, newAuthor) => {
    if (err) {
      res.render("authors/new", {
        author: author,
        errorMes: "Error creating Author",
      });
    } else {
      //res.redirect(`author/${newAuthor.id}`)
      res.redirect(`authors`);
    }
  });
  // res.send(req.body.name);
});

module.exports = router;
