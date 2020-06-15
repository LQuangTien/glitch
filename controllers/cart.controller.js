var db = require('../db')
const shortid = require('shortid');
module.exports.addToCart = (req, res) => {
  let bookId = req.params.bookId;
  let sessionId = req.signedCookies.sessionId;
  if(!sessionId) {
    res.redirect('/books');
    return
  }
  let count = db
    .get('sessions')
    .find({id: sessionId})
    .get('cart.' + bookId, 0)
    .value();
  db.get('sessions')
    .find({id: sessionId})
    .set('cart.' + bookId, count + 1)
    .write();
  res.redirect('/books');
}
module.exports.getCart = (req, res) => {
  let sessionId = req.signedCookies.sessionId;
  let session = db.get('sessions')
    .find({id: sessionId})
    .value()
  res.render('cart/index', {
    cart: session.cart
  })
}
module.exports.getPayment = (req, res) => {
  let userId = req.signedCookies.userid;
  if(!userId){
    res.render('cart/index', {
      errors: ['Vui long Dang Nhap']
    })
    return;
  }
  let sessionId = req.signedCookies.sessionId;
  
  let session = db.get('sessions').find({id: sessionId}).value();
  for(let book in session.cart){
    db.get('transactions')
      .push({
        userid: userId,
        bookid: book,
        isComplete: true,
        id: shortid.generate()
      })
      .write()
  }
  res.redirect('/books');
}