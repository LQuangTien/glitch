const mongoose = require('mongoose');
var bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    type: String,
    default: "https://loremflickr.com/320/240"
  }
})
var Book = mongoose.model('Book ', bookSchema, 'books');
module.exports = Book;
