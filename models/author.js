const mongoose = require("mongoose");
const Book = require("./book")
//schema
const authorSchema = new mongoose.Schema({
  name: {
    //json objs
    type: String,

    required: true,
    unique: true,
    dropDups: true
  }
})

// pre method allow to pre call when remove the author
authorSchema.pre('remove', function (next) {
  // author == this.id 
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      // if the author find has error, pass the error to author delete method
      next(err)
    } else if (books.length > 0) {
      books.forEach(book => book.remove())
      next()
    } else {
      next()
    }
  })
})

module.exports = mongoose.model("Author", authorSchema);
