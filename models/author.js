const mongoose = require("mongoose");
//schema
const authorSchema = new mongoose.Schema({
  name: {
    //json objs
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Author", authorSchema);
