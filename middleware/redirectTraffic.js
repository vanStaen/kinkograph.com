module.exports = function redirectTraffic(req, res, next) {
  if (req.headers.host.slice(0, 4) === "www." || req.protocol === "http") {
    var newHost = req.headers.host.slice(4);
    return res.redirect(301, "https://" + newHost + req.originalUrl);
  }
  next();
};
