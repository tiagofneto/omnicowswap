import express from 'express'
import { parseBundle } from './parse.js'

const app = express()
app.use(express.json())
const port = 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const txs = []

app.post('/order', (req, res) => {
  txs.push(req.body)
  res.end()
})

const bundleMinutes = 1
setInterval(parseBundle, bundleMinutes * 60 * 1000)
