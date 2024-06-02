// /server/src/routes/routes.index.js

var express = require('express')
var router = express.Router()

// Route to access index or home page
router.get('/', (req, res) => res.render('index'))

module.exports = router
