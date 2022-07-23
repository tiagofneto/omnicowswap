const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

const txs = []

app.post('/order', (req, res) => {
  txs.push(req.body)
  res.end()
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
