const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//all authors router
router.get("/", async (req, res) => {
  let searchOptions = {}
  if (req.query.name !== null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
    // i is case insensitive
  }
  try {
    // display and find one user from mongodb
    const authors = await Author.find(searchOptions) // empty means all authors, then pass into the index page by
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
      // send back to user in input value
    })
  } catch {
    // if something wrong, we go to home page.
    res.redirect("/");
  }
});

//new author router
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() }); // why to give obj for ejs to use
});

//create author router
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name
    // 确定传的参是 name， 不是id 或其他
  });

  try {
    const newAuthor = await author.save();
    // mongoose is async, wait till save complete, then poplute the createAuthor variable
    res.redirect(`authors/${newAuthor.id}`)

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

router.get('/:id', (req, res) => {
  res.send('Show Author ' + req.params.id)
})

router.get('/:id/edit', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    res.render("authors/edit", { author: author });
  } catch {
    res.redirect('/authors')
  }
})

// little differ with post method: 
router.put('/:id', async (req, res) => {
  // create new var to try to find the id fro db
  // catch method has to use same var
  let author
  try {
    author = await Author.findById(req.params.id)
    // update 后 改一下， 存到数据库
    author.name = req.body.name
    await author.save()
    // mongoose is async, wait till save complete, then poplute the createAuthor variable
    res.redirect(`/authors/${author.id}`) // 必须加/， 表示root， 否则就 是relative 地址了。 

  } catch {
    // if author == null means failed in try block
    if (author == null)
      res.redirect('/')
    else {
      // if valid, direct to edit page
      res.render("authors/edit", {
        author: author,
        errorMessage: "Error udating Author",
      });
    }
  }
})
// delete route 跟 update 差不多。 
// 但是还要delete 掉 相关的 book。 
router.delete('/:id', async (req, res) => {

  let author
  try {
    author = await Author.findById(req.params.id)
    // update 后 改一下， 存到数据库
    //  author.name = req.body.name 
    await author.remove()
    // mongoose is async, wait till save complete, then poplute the createAuthor variable
    res.redirect('/authors') // 必须加/， 表示root， 否则就 是relative 地址了。 

  } catch {
    // if author == null means failed in try block
    if (author == null) {
      res.redirect('/')
    } else {
      // if valid, direct to edit page
      res.redirect(`/authors/${author.id}`)
    }
  }
  // 删除的时候记得 还有book 相连。 去data 那边做处理

})
module.exports = router;
