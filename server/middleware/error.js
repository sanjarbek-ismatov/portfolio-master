module.exports = (err, req, res, next) => {
  if (err) return res.status(500).send("Serverda xato yuz berdi! :(");
  next();
};
