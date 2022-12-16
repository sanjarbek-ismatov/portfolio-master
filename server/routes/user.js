const express = require('express')
const auth = require('../middleware/auth')
const {User} = require('../models/Model')
const router = express.Router()
router.get('/me', auth, async (req, res) => {
    return res.status(200).send(await User.findById(req.id))
})
module.exports = router