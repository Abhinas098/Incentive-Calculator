const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const router = express.Router();

const oauth2Client = new OAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: "https://developers.google.com/oauthplayground",
});

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "abhinasdash143@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
  },
});

function sendNotification(userEmail, incentiveDetails, holidayPackage) {
  const mailOptions = {
    from: "abhinasdash143@gmail.com",
    to: userEmail,
    subject: "Performance and Incentive Details",
    html: `
      <h3>Incentive Earnings:</h3>
      <p>${incentiveDetails}</p>

      <p>${holidayPackage}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

router.post("/", (req, res) => {
  const { userEmail, incentiveDetails, holidayPackage } = req.body;
  if (!userEmail || !incentiveDetails || !holidayPackage) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  sendNotification(userEmail, incentiveDetails, holidayPackage);
  res.status(200).json({ message: "Email sent successfully" });
});

module.exports = router;
