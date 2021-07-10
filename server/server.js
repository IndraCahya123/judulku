const express = require('express')
const router = require('./src/routes')
const cors = require('cors')

require('dotenv').config()

const app = express()

const serverPort = process.env.PORT || 5000

app.use(express.json())

app.use(cors())

app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.send('This is server home')
})

app.use(express.static(__dirname + '/public'))
app.use('/files', express.static('files'))

app.listen(serverPort, () =>
  console.log(`Server running at port ${serverPort}`),
)
