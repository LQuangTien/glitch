module.exports.getCookie = function(req, res, next){
  let count = 0
  res.cookie('cookiE', ++count);
  next()
}