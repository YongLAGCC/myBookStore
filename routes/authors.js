const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const author = require("../models/author");

//all authors router
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find({});
    res.render("authors/index", { authors: authors });
  } catch {
    res.redirect("/");
  }
});

//new author router
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});
//create author router
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
    // 确定传的参是 name， 不是id 或其他
  });
  const locals = { errorMessage: "something went wrong" };
  try {
    const createAuthor = await author.save();
    //res.redirect(`authors/${newAuthor.id}`)
    res.render(`authors`, locals);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});
// author.save((err, newAuthor) => {
//   if (err) {
//     res.render("authors/new", {
//       author: author,
//       errorMessage: "Error creating Author",
//     });
//   } else {
//     //res.redirect(`authors/${newAuthor.id}`)
//     res.redirect(`authors`, locals);
//   }

// res.send(req.body.name);
// });

module.exports = router;
