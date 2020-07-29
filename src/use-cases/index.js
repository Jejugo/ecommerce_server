const makeRegisterCustomer = require('./customer/registerCustomer')
const makeVerifyEmailToken = require('./email/verifyEmailToken')
const makeSendEmail = require('./email/sendEmail')

const bcrypt = require('bcrypt')
const { Customer } = require('../models')
const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const jwt = require('jsonwebtoken')

const sendEmail = makeSendEmail({ nodemailer, google })
const registerCustomer = makeRegisterCustomer({ bcrypt, Customer, sendEmail, jwt })
const verifyEmailToken = makeVerifyEmailToken({})



module.exports = {
  registerCustomer,
  verifyEmailToken,
  sendEmail
}