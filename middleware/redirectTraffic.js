module.exports = function redirectTraffic(req, res, next) {
  console.log("req.headers.host", req.headers.host)
  console.log("req.protocol", req.protocol)
  if (req.headers.host.slice(0, 4) === "www." || req.protocol === "http") {
    console.log("redirected to: https://kinkograph.com")
    return res.redirect(301, 'https://kinkograph.com');
  }
  next();
};
