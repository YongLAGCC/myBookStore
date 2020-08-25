const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path')
// fs for delete the false book string in public
const fs = require('fs');
const Book = require("../models/book");
const Author = require("../models/author");

// where at be uploaded the file, the path (combined) from public to book.coverImage .. 
const uploadPath = path.join('public', Book.coverImageBasePath)
//what file will accept
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})

//all books router
router.get("/", async (req, res) => {
  try {
    let books = await Book.find({})
    res.render('books/index', {
      books: books,
      search: req.query
    })
  } catch {
    res.redirect("/")
  }

});

//new book router
router.get("/new", async (req, res) => {
  renderNewPage(res, new Book())
  // 调用下面的func 不需要担心error， 因为是create a new never get error
});

//create book router
router.post("/", upload.single('cover'), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),// convert to string
    pageCount: req.body.pageCount,
    coverImageName: fileName,
    description: req.body.description

  })
  try {
    const newBook = await book.save()
    // res.redirect(`books/${newBook.id}`)
    res.redirect("books")

  } catch {
    // 如果 存储book 有错误，立刻断开 image的储存地址
    if (book.coverImageName != null) {
      removeBookCover(book.coverImageName)
    }
    renderNewPage(res, book, true)
  }
});

function removeBookCover(filename) {
  fs.unlink(path.join(uploadPath, filename), err => {
    if (err) console.error(err)
  })
}

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({})
    const params = {
      authors: authors,
      book: book
    }
    if (hasError) params.errorMessage = 'Error Creating Book'
    // const book = new Book() 不需要pass 新book
    res.render('books/new', params)
  } catch{

    res.redirect("/books")
  }
}
module.exports = router;
