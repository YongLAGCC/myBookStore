const mongoose = require("mongoose");
//schema

const coverImageBasePath = 'uploads/bookCovers'
const bookSchema = new mongoose.Schema({
  title: {
    //json objs
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  createAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImageName: {
    // just save string of image on the server in file
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,  // refer to author's object
    required: true,
    ref: 'Author'
    // tell that have to match Author collecton name, that in author's export name.
  }
});

module.exports = mongoose.model("Book", bookSchema);
module.exports.coverImageBasePath = coverImageBasePath