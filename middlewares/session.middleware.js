const Session = require('../models/session.model')
module.exports = function(req, res, next){
  if(!req.signedCookies.sessionId){
    const newSession = new Session();
    newSession.save();
    res.cookie('sessionId', newSession.id, {
      signed: true
    });

  }
  next();
}
