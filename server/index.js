const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const { 
  getHealth,
  postCustomer
} = require('../src/controllers')

const expressCallBack = require('./endpoint-callback')

const app = express()
app.use(bodyParser.json())

app.get('/health', expressCallBack(getHealth))
app.post('/register', expressCallBack(postCustomer))


app.listen(3001, () => {
  console.log('Server is listening on port 3001.')
})
 
module.exports = app