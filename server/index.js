import express from 'express'
import { parseBundle } from './parse.js'

const app = express()
app.use(express.json())
const port = 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const txs = []

app.post('/order', (req, res) => {
  txs.push(req.body)
  console.log(txs)
  res.end()
})

const bundleMinutes = 1
setInterval(() => parseBundle(txs) , bundleMinutes * 60 * 1000)
