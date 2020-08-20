const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const { 
  getHealth,
  postCustomer,
  postLogin,
  getEmailToken,
  getCustomerByToken,
  postRefreshToken,
  putCustomer,
  postCheckout,
  getProducts,
  getProduct
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
    res.setHeader("Access-Control-Allow-Origin", origin)
  }
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/health', expressCallBack(getHealth))
app.post('/register', expressCallBack(postCustomer))
app.put('/customer/:id', expressCallBack(putCustomer))

//authentication
app.post('/login', expressCallBack(postLogin))
app.get('/email/verification/:code', redirectCallBack(getEmailToken))
app.get('/customer/token/:token',  expressCallBack(getCustomerByToken))
app.post('/refresh/token', expressCallBack(postRefreshToken))

//products
app.get('/products', expressCallBack(getProducts))
app.get('/products/:id', expressCallBack(getProduct))

//purchase
app.post('/checkout', expressCallBack(postCheckout))

app.listen(3002, () => {
  console.log('Server is listening on port 3002.')
})
 
module.exports = app