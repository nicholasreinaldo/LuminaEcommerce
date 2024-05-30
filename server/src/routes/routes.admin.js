var express = require('express')
var router = express.Router()

/* Get Home Page */
router.get('/', (req, res) => res.render('admin'))

module.exports = router
