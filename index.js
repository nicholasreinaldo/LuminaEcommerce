const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

// Importing all routers from the routes folder
const indexRouter = require('./server/src/routes/routes.index')
const adminRouter = require('./server/src/routes/routes.admin')
const productsRouter = require('./server/src/routes/routes.products')

// Express configurations
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // Set middleware for parsing URL-encoded payloads in HTTP requests.
app.set('view engine', 'ejs') // Setup EJS view engine
app.use(express.static(path.join(__dirname, 'client'))) // Set directory for static files
app.set('views', path.join(__dirname, 'client/src/views')) // set views templates directory

/* Using all routers */
app.use('/', indexRouter)
app.use('/api', productsRouter)
app.use('/admin', adminRouter)
app.use('/api/admin', adminRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
