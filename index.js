const express = require('express')
const app = express()
const path = require('path')
const port = 3000

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'client/src/views'))

app.get('/', (req, res) => res.render('index'))

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
