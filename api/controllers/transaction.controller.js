const shortid = require('shortid');

var db = require("../../db");

let transactions = db.get('transactions').value();

module.exports.index = (req, res) => {
  res.json(transactions);
};
module.exports.create = (req, res) => {
  if(!req.body.id){
    req.body.id= shortid.generate();
  }
  let transaction = db.get('transactions').find({id: req.body.id});
  db.get('transactions').push(req.body).write();
  res.json(transactions);
};
module.exports.put = (req, res) => {
  let tran = db.get('transactions').find({id: req.params.id}).value();
  req.body.id = req.params.id;
  if(!tran) { 
    req.body.isComplete = req.body.isComplete || false;
    db.get('transactions').push(req.body).write();
    res.json(transactions);
  } else {
    db.get('transactions')
      .remove({ id: req.params.id })
      .write()
    req.body.isComplete = req.body.isComplete || false;
    db.get('transactions').push(req.body).write();
    res.json(transactions);
  }
};
module.exports.delete = (req, res) => {
  db.get('transactions')
    .remove({ id: req.params.id })
    .write()
  db.get('transactions').write();
  res.json(transactions);
};
module.exports.patch = (req, res) => {
  let tran = db.get('transactions').find({id: req.params.id}).value();  
  if(!tran){
    return res.status(202).json({success: false, msg: "Transaction khong ton tai"})
  }
  let keys = Object.keys(req.body);
  for(let key of keys) {
    tran[key] = req.body[key];
  }
  db.get('transactions').write();
  res.json(transactions);
};