module.exports = function redirectTraffic(req, res, next) {
  if (req.headers.host.slice(0, 4) === "www." || req.protocol === "http") {
    return res.redirect(301, 'https://kinkograph.com');
  }
  next();
};
