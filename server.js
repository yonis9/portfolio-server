const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const app = express();

app.use(cors())
app.use(bodyParser.json());


app.post('/message', (req, res) => {
    const { name, from, message } = req.body;

    const OAuth2 = google.auth.OAuth2;

    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID, // Client id
      process.env.CLIENT_SECRET, // Client Secret
      "https://developers.google.com/oauthplayground" // Redirect URL
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
    
    const accessToken = oauth2Client.getAccessToken()

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
               type: "OAuth2",
               user: "yonis9@gmail.com", 
               clientId: process.env.CLIENT_ID,
               clientSecret: process.env.CLIENT_SECRET,
               refreshToken: process.env.REFRESH_TOKEN,
               accessToken: accessToken
          }
        });

        const mailOptions = {
          from: from,
          to: 'yonis9@gmail.com', 
          subject: name+` | ${from} | new message !`,
          text: message
      }
      
      transporter.sendMail(mailOptions, (error, response) => {
        if(error){
            res.json(error)
        }else{
          res.json(response)
        }
    })
      }
      

)

app.listen(process.env.PORT || 3001, () => {
	console.log(`app is running on port 3001`)
})