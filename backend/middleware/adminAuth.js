module.exports = function (req, res, next) {
    const { phone, password } = req.headers;
  
    if (phone === "9812879214" && password === "Anshu@123") {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };
  