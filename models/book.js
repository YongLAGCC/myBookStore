const mongoose = require("mongoose");
//schema
const path = require('path')

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
  createdAt: {
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

// virtual perproty fund 可以derive 其中变量的值。
bookSchema.virtual('coverImagePath').get(function () {
  // 必须用funciton， 不能用=> 去得到this
  if (this.coverImageName != null) {
    return path.join("/", coverImageBasePath, this.coverImageName)
    // return  路径public folder path 和 有名字。 可以直接在index.jes 里用
  }
})

module.exports = mongoose.model('Book', bookSchema);
module.exports.coverImageBasePath = coverImageBasePath