// /index.js

const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

// Importing all routers from the routes folder
const indexRouter = require('./server/src/routes/routes.index')
const loginRouter = require('/server/src/routes/routes.login')
const usersRouter = require('./server/src/routes/routes.users')
const adminRouter = require('./server/src/routes/routes.admin')
const productsRouter = require('./server/src/routes/routes.products')

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'client')))
app.set('views', path.join(__dirname, 'client/src/views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Using all routers */
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/user', usersRouter)
app.use('/api', productsRouter)
app.use('/admin', adminRouter)
app.use('/api/admin', adminRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
