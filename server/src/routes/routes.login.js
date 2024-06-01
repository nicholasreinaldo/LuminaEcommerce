// /server/src/routes/routes.login.js

var express = require('express')
var router = express.Router()

// Route to access /login
router.get('/', (req, res) => res.render('login'))

module.exports = router
