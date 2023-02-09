/**
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports = (err, req, res, next) => {
  if (err) {
    console.log(err);
    return res.status(500).send("Serverda xato yuz berdi! :(");
  }

  next();
};
