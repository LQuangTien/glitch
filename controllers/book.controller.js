const shortid = require('shortid');

var db = require("../db");

let books = db.get('books').value();

module.exports.index = (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let perPage = 4;
  let drop = (page - 1) * perPage;
  res.render('books/index', {
    books: db.get('books').drop(drop).take(perPage).value(),
    pages: Math.ceil((db.get('books').size()/perPage)),
    currentPage: page
  });
};
module.exports.getCreate = (req, res) => {
  res.render('books/create')
};
module.exports.postCreate =  (req, res) => {
  req.body.id = shortid.generate();
  db.get('books').push(req.body).write();
  res.redirect('/books');
}
module.exports.getDelete =  (req, res) => {
  let id = req.params.id;
  res.render('books/delete',{id: id})
}
module.exports.postDelete = (req, res) => { 
  let book = db.get('books').find({id: req.body.id}).value();
  books.splice(books.indexOf(book),1);
  db.get('books').write();
  res.redirect('/books');
}
module.exports.getUpdate = (req, res) => {
  let id = req.params.id;
  res.render('books/update',{id: id})
}
module.exports.postUpdate = (req, res) => {
  let book = db.get('books').find({id: req.body.id}).value();
  book.title = req.body.title;
  db.get('books').write();
  res.redirect('/books');
}