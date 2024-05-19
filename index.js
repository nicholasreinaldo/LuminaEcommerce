const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.get('/api/products', (req, res) => res.json(products))

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
