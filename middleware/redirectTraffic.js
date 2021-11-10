module.exports = function redirectTraffic(req, res, next) {
  if (req.headers.host.substring(0, 9) !== "localhost") {
    if (req.headers.host.slice(0, 4) === "www.") {
      var newHost = req.headers.host.slice(4);
      return res.redirect(301, "https://" + newHost + req.originalUrl);
    }
    if (req.protocol === "http") {
      return res.redirect(301, "https://" + req.headers.host + req.originalUrl);
    }
  }
  next();
};
