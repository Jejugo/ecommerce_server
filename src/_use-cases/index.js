const makeRegisterCustomer = require('./customer/registerCustomer')
const makeVerifyEmailToken = require('./email/verifyEmailToken')
const makeSendEmail = require('./email/sendEmail')
const makeRetrieveCustomerByToken = require('./customer/retrieveCustomerByToken')
const makeLoginAction = require('./login/loginAction')
const makeUpdateCustomer = require('./customer/updateCustomer')
const makeCheckoutAction = require('./purchase/checkoutAction')
const makeRetrieveProducts = require('./product/retrieveProducts')
const makeRetrieveProduct = require('./product/retrieveProduct')
const makeRetrieveProductPrice = require('./product/retrieveProductPrice')

const bcrypt = require('bcrypt')
const { Customer, Address } = require('../models')
const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const jwt = require('jsonwebtoken')
const builder = require('../builders/customer')
const stripe = require('stripe')('sk_test_51HEoDCLSuvyhvVGumaaei3zEpEYlpaOadJeRphDyrpb0999ySE3BuNztJFbCcpL4nXlgnREH4QA2U4Yienr2bMlm00C4M6RE1Q')
const { v4: uuid } = require('uuid');

const sendEmail = makeSendEmail({ nodemailer, google })
const registerCustomer = makeRegisterCustomer({ bcrypt, Customer, sendEmail, jwt, stripe })
const verifyEmailToken = makeVerifyEmailToken({ jwt, Customer })
const retrieveCustomerByToken = makeRetrieveCustomerByToken({ Customer, Address, jwt, builder })
const loginAction = makeLoginAction({ jwt, bcrypt, Customer })
const updateCustomer = makeUpdateCustomer({ Customer, Address })
const checkoutAction = makeCheckoutAction({ stripe, uuid, Customer })
const retrieveProducts = makeRetrieveProducts({ stripe })
const retrieveProduct = makeRetrieveProduct({ stripe })
const retrieveProductPrice = makeRetrieveProductPrice({ stripe })


module.exports = {
  registerCustomer,
  verifyEmailToken,
  sendEmail,
  retrieveCustomerByToken,
  loginAction,
  updateCustomer,
  checkoutAction,
  retrieveProducts,
  retrieveProduct,
  retrieveProductPrice
}