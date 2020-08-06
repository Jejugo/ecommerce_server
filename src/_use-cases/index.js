const makeRegisterCustomer = require('./customer/registerCustomer')
const makeVerifyEmailToken = require('./email/verifyEmailToken')
const makeSendEmail = require('./email/sendEmail')
const makeRetrieveCustomerByToken = require('./customer/retrieveCustomerByToken')
const makeLoginAction = require('./login/loginAction')

const bcrypt = require('bcrypt')
const { Customer } = require('../models')
const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const jwt = require('jsonwebtoken')

const sendEmail = makeSendEmail({ nodemailer, google })
const registerCustomer = makeRegisterCustomer({ bcrypt, Customer, sendEmail, jwt })
const verifyEmailToken = makeVerifyEmailToken({ jwt, Customer })
const retrieveCustomerByToken = makeRetrieveCustomerByToken({ Customer, jwt })
const loginAction = makeLoginAction({ jwt, bcrypt, Customer })


module.exports = {
  registerCustomer,
  verifyEmailToken,
  sendEmail,
  retrieveCustomerByToken,
  loginAction
}