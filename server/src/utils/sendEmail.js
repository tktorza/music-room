import nodemailer from 'nodemailer'

function emailTemplate (name, code) {
  return `<html>

  <head>
  <title>Music-Room - Confirm your account!</title>
  <style>
  @font-face {
    font-family: 'Avenir';
    src: url('https://www.letsgohatch.com/assets/fonts/avenirltstd-heavy-webfont.eot');
    src: url('https://www.letsgohatch.com/assets/fonts/avenirltstd-heavy-webfont.eot?#iefix') format('embedded-opentype'),
    url('https://www.letsgohatch.com/assets/fonts/avenirltstd-heavy-webfont.woff2') format('woff2'),
    url('https://www.letsgohatch.com/assets/fonts/avenirltstd-heavy-webfont.woff') format('woff'),
    url('https://www.letsgohatch.com/assets/fonts/avenirltstd-heavy-webfont.ttf') format('truetype'),
    url('https://www.letsgohatch.com/assets/fonts/avenirltstd-heavy-webfont.svg#webfontregular') format('svg');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Avenir';
    src: url('https://www.letsgohatch.com/assets/fonts/avenirltstd-medium-webfont.eot');
    src: url('https://www.letsgohatch.com/assets/fonts/avenirltstd-medium-webfont.eot?#iefix') format('embedded-opentype'),
    url('https://www.letsgohatch.com/assets/fonts/avenirltstd-medium-webfont.woff2') format('woff2'),
    url('https://www.letsgohatch.com/assets/fonts/avenirltstd-medium-webfont.woff') format('woff'),
    url('https://www.letsgohatch.com/assets/fonts/avenirltstd-medium-webfont.ttf') format('truetype'),
    url('https://www.letsgohatch.com/assets/fonts/avenirltstd-medium-webfont.svg#webfontregular') format('svg');
    font-weight: normal;
    font-style: normal;

  }

  @font-face {
    font-family: 'Avenir';
    src: url('https://www.letsgohatch.com/assets/fonts/avenirltstd-light-webfont.eot');
    src: url('https://www.letsgohatch.com/assets/fonts/avenirltstd-light-webfont.eot?#iefix') format('embedded-opentype'),
    url('https://www.letsgohatch.com/assets/fonts/avenirltstd-light-webfont.woff2') format('woff2'),
    url('https://www.letsgohatch.com/assets/fonts/avenirltstd-light-webfont.woff') format('woff'),
    url('https://www.letsgohatch.com/assets/fonts/avenirltstd-light-webfont.ttf') format('truetype'),
    url('https://www.letsgohatch.com/fonts/avenirltstd-light-webfont.svg#webfontregular') format('svg');
    font-weight: 100;
    font-style: normal;
  }
  body{
    background: #ffffff;
    margin: 0px;
    text-align: center;
    font-family: 'Avenir', 'Open Sans', Arial, sans-serif;
  }
  .head{
    background: #e47f02;
    color: #ffffff;
  }

  .head h1{
    font-size: 50px;
    font-weight: normal;
    line-height: 100px;
    margin-top: 100px;
  }

  .button{
    background: #39ce00;
    color: #ffffff;
    line-height: 50px;
    text-decoration: none;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 50px;
    background-color: #0b8dbd;
  }

  .button a{
    color: #ffffff;
    text-decoration: none;
  }
  a{ color: #fff; }
  p a{ color: #565656; }
  .black a{ color: #000; }
  </style>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
  </head>

  <body bgcolor="#ffffff">
  <table bgcolor="#efefef" cellpadding="0" cellspacing="0" border-collapse="collapse" width="100%">
  <tr>
  <td align="center" style="padding: 30px;">
  <table bgcolor="#efefef" cellpadding="0" cellspacing="0" border-collapse="collapse" width="700px">
  <tr>
  <td align="center">
  <table bgcolor="#efefef" cellpadding="0" cellspacing="0" border-collapse="collapse" width="100%">
  <tr>
  <td width="50%" style="text-align: right;">
  <!--<a href="#" style="color: #868686;">View in Browser</a>-->
  </td>
  </tr>
  </table>
  <table bgcolor="#e47f02" class="head" style="background: #e47f02;" cellpadding="0" cellspacing="0" border="0" border-collapse="collapse" width="100%">
  <tr>
  <td style="text-align: center;" colspan="3">
  <h1>Welcome to Music-Room</h1>

  </td>
  </tr>
  <tr>
  <td colspan="3" style="padding: 0px 80px; font-size: 20px; text-align: center;">Hi ${name}, Welcome to Music-Room, please confirm your email address to get started.</td>
  </tr>
  <tr>
  <td width="30%">&nbsp;</td>
  <td style="text-align: center;" width="40%">
  <table cellpadding="0" cellspacing="0" border-collapse="collapse" class="button" width="100%">
  <tr>
  <td>
  <p style="font-size: 15px;">Your code: ${code} </p>
  </td>
  </tr>
  </table>
  </td>
  <td width="30%">&nbsp;</td>
  </tr>

  </body>`
}
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: 'ziqRoom@gmail.com',
    pass: '1234@Music',
  },
})

export function send (from, to, subject, body) {
  const emailBody = {
    from: `<${from}>`,
    to: `${to}`,
    subject: `${subject}`,
    html: emailTemplate(body.name, body.code),
  }

  transporter.sendMail(emailBody, (error, info) => {

    if (error) { return error }
    return info
  })
}
