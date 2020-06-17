const Session = require('../models/session.model');
const Transaction = require('../models/transaction.model');
module.exports.addToCart = async (req, res) => {
  const bookId = req.params.bookId;
  const sessionId = req.signedCookies.sessionId;
  if(!sessionId) {
    res.redirect('/books');
    return
  }
  const session = await Session.findById(sessionId);
  const count = session.cart[bookId] ? session.cart[bookId] : 0;
  await Session.findByIdAndUpdate(sessionId, {
    ['cart.' + bookId]: count + 1
  });
  res.redirect('/books');
}
module.exports.getCart = async (req, res) => {
  const session = await Session.findById(req.signedCookies.sessionId) 
  res.render('cart/index', {
    cart: session.cart
  })
}
module.exports.getPayment = async (req, res) => {
  let userId = req.signedCookies.userid;
  if(!userId){
    res.render('cart/index', {
      errors: ['Vui long Dang Nhap']
    })
    return;
  }
  let sessionId = req.signedCookies.sessionId;
  let session = await Session.findById(sessionId);
  for(let book in session.cart){
    const newTransaction = new Transaction({
      userid: userId,
      bookid: book,
      isComplete: true
    })  
    newTransaction.save();
  }
  res.redirect('/books');
}
