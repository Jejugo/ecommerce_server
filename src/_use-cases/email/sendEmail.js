const makeSendEmail = ({ nodemailer, google } = {}) => {
  //setting variables for the google API generated before
  const originEmail = "goes.jeffjulian@gmail.com"
  const clientId =
    "54725897049-pag81lj4e15hok6s4mvkd94eclj3bv0r.apps.googleusercontent.com"
  const clientSecret = "qhvS5-xJeYHs8nL0r4-iHZkC"
  const refreshToken = '1//04y5rzzQJRNyxCgYIARAAGAQSNwF-L9Ir1C8VJyb1fuhXxM-HttmmquI7NgXv8r-vgZfiE_WfGB-mL4acw_FxvZiocdaM2Wce9ZA'

  return async function sendEmail({ name, customerEmail, emailToken }) {
    //google authentication
    const OAuth2 = google.auth.OAuth2

    //instantiated google authentication API
    const oauth2Client = new OAuth2(
      clientId,
      clientSecret,
      "https://developers.google.com/oauthplayground" // Redirect URL
    )

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    })

    const accessToken = await oauth2Client.getAccessToken()
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        clientId,
        user: originEmail,
        clientSecret,
        refreshToken,
        accessToken,
      },
    })

    const mailOptions = {
      from: originEmail,
      to: customerEmail,
      subject: "Ecommerce - Email Cofirmation",
      generateTextFromHTML: true,
      html: `<h1 style="text-align: center">Parabéns por se cadastrar no Ecommerce!</h1>
      <h3 style="text-align: center">Clique no botão abaixo para confirmar seu cadastro!</h3>
      <div style="display: flex; justify-content: center">
      <button style="width: 200px; height: 30px; margin: 0 auto; background-color: blue; border: 0; cursor: pointer"><a style="font-size: 20px; cursor: pointer; color: white" href="http://localhost:3002/email/verification/${emailToken}">Confirmar</a></button>
      </div>`
    }

    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(`ENTROU AQUI`)
        throw Error(error)
      }
      smtpTransport.close()
    })
  }
}

module.exports = makeSendEmail
