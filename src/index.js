const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const { 
  getHealth,
  postCustomer,
  postLogin,
  getEmailToken,
  getCustomerByToken,
  postRefreshToken
} = require('./_controllers')

dotenv.config()

const cors = require('../server/cors')
const expressCallBack = require('../server/endpoint-callback')
const redirectCallBack = require('../server/endpoint-redirect')

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
//authentication
app.post('/register', expressCallBack(postCustomer))
app.post('/login', expressCallBack(postLogin))
app.get('/email/verification/:code', redirectCallBack(getEmailToken))
app.get('/customer/token/:token',  expressCallBack(getCustomerByToken))
app.post('/refresh/token', expressCallBack(postRefreshToken))

app.listen(3002, () => {
  console.log('Server is listening on port 3002.')
})
 
module.exports = app