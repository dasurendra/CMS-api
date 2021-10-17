import nodemailer from 'nodemailer'

const send = async (mailInfo) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const info = await transporter.sendMail(mailInfo)

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  } catch (error) {
    console.log(error)
  }
}

export const emailProcessor = ({ email, otp }) => {
  const link = `${process.env.CLIENT_URL}/email-verification?otp=${otp}&email=${email}`
  const mailObj = {
    form: `"Eshop"<${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'User Email Verification ✔',
    text: `Hi there please click on the link below to verify your email.${link}`,
    html: `Hello there,
       <br/>
       <p>
       Thank you for registering with us.Please follow the link to verify your email
       </p>

       <p>
       <a href ="${link}">${link}</a>
       </p>
<br/>

<p>Kind regards, <br/>
-- Some company Info --
</p>


       
       `,
  }
  send(mailObj)
}

export const emailVerification = (email) => {
  const mailObj = {
    form: `"Eshop"<${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to Eshop ✔',
    text: `Hi there,You are fully verified and you may sign in now.`,
    html: `Hello there,
       <br/>
       <p>
       Thank you for verifying.You may sign in now.
       </p>

       
<br/>

<p>Kind regards, <br/>
-- Some company Info --
</p>


       
       `,
  }
  send(mailObj)
}
