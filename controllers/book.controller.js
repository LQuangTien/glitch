const Book = require('../models/book.model')

module.exports.index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 4;
  const drop = (page - 1) * perPage;
  res.render('books/index', {
    books: await Book.find().skip(drop).limit(perPage),
    pages: Math.ceil(await Book.find().count()/perPage),
    currentPage: page
  });
};
module.exports.getCreate = (req, res) => {
  res.render('books/create')
};
module.exports.postCreate =  (req, res) => {
  let newBook = new Book(req.body)
  newBook.save()
  res.redirect('/books');
}
module.exports.getDelete =  (req, res) => {
  let id = req.params.id;
  res.render('books/delete',{id: id})
}
module.exports.postDelete = async (req, res) => { 
  await Book.findOneAndDelete({_id: req.body.id})
  res.redirect('/books');
}
module.exports.getUpdate = (req, res) => {
  res.render('books/update')
}
module.exports.postUpdate = async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, {
    title: req.body.title
  }, {new: true})
  res.redirect('/books');
}
