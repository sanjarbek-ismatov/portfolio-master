const express = require("express");
const User = require("../models/usermodel");
const { registerValidator } = require("../helpers/validator");
const { upload } = require("../models/storage");
const createUser = require("../helpers/usercreator");
const bcrypt = require("bcrypt");
const {
  sendMail,
  generateToken,
  url,
  verifyToken,
} = require("../helpers/mailverificator");
const router = express.Router();

/**
 * @swagger
 * /auth/send-verification:
 *  post:
 *    description: This should send verification email
 *    parameters:
 *      - name: email
 *        in: body
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/send-verification", async (req, res) => {
  if (!req.body.email) return res.status(400).send("Bad request!");
  const token = generateToken(req.body.email);
  sendMail(
    req.body.email,
    `${url()}/auth/register?email=${req.body.email}&token=${token}`
  );
  res.status(200).send(true);
});

/**
 * @swagger
 * /auth/:
 *  post:
 *    description: This should register user
 *    parameters:
 *      - name: email
 *        in: body
 *        required: true
 *        type: string
 *      - name: username
 *        in: body
 *        required: true
 *        type: string
 *      - name: password
 *        in: body
 *        required: true
 *        type: string
 *      - name: image
 *        in: formData
 *        required: false
 *        type: file
 *      - name: token
 *        in: header
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/", upload.single("image"), async (req, res) => {
  if (!verifyToken(req.body.email, req.headers["token"]))
    return res.status(400).send("Ushbu email tasdiqlanmagan!");
  const salt = await bcrypt.genSalt();
  const { error } = registerValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const email = await User.findOne({ email: req.body.email });
  const username = await User.findOne({ username: req.body.username });
  if (email || username) {
    return res.status(400).send("Email yoki username allaqachon mavjud");
  }
  if (req.body.password)
    req.body.password = await bcrypt.hash(req.body.password, salt);
  if (req.file) await createUser(req.body, req.file.filename);
  else await createUser(req.body, null);
  res.send(true);
});
module.exports = router;
