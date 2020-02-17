const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require("nodemailer");
const app = express();

app.use(cors())
app.use(bodyParser.json());


app.post('/message', (req, res) => {
    const { name, from, message } = req.body;

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: 'yonis9@gmail.com', // generated ethereal user
            pass: process.env.PASSWORD // generated ethereal password
          }
        });
from
        const mailOptions = {
          from: from,
          to: 'yonis9@gmail.com', 
          subject: name+` | ${from} | new message !`,
          text: message
      }
      
      transporter.sendMail(mailOptions, function(error, response){
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