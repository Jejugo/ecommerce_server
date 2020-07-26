const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const { 
  getHealth,
  postCustomer,
  postEmailToken
} = require('./controllers')

const cors = require('../server/cors')
const expressCallBack = require('../server/endpoint-callback')

const app = express()
app.use(bodyParser.json())


app.use((req, res, next) => {
  const origin = req.headers.origin;
  if(cors.allowedOrigins.includes(origin)){
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/health', expressCallBack(getHealth))
app.post('/register', expressCallBack(postCustomer))
app.post('/email/verification', expressCallBack(postEmailToken))


app.listen(3002, () => {
  console.log('Server is listening on port 3002.')
})
 
module.exports = app