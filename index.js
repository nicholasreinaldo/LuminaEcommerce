const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

// Importing all routers from the routes folder
const indexRouter = require('./server/src/routes/index')
const adminRouter = require('./server/src/routes/admin')
const productsRouter = require('./server/src/routes/products')

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'client')))
app.set('views', path.join(__dirname, 'client/src/views'))

/* Using all routers */
app.use('/', indexRouter)
app.use('/admin', adminRouter)
app.use('/api', productsRouter)

/* Get Login Page */
app.get('/login', (req, res) => res.render('login'))

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
