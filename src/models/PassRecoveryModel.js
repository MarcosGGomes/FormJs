const nodemail = require('nodemailer');
const dotenv = require('dotenv');

class Email {
    constructor(email) {
        this.Email = null;
        this.transporter =  nodemail.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.USER,
              pass: process.env.PASS
            }
          });
        this.mailOptions =   {
            from: process.env.FROM,
            to: email, 
            subject: 'Nodemailer teste',
            text: this.randomCode(5)
          }
        this.user = null;   
    }

    randomCode(size) {
        let string = ''
        let caracter = process.env.CARACTER // 'asuhHkaKopOHSdnNmM'
        for(let i = 0; i < size; i++) {
            string += caracter.charAt(Math.floor(Math.random() * caracter.length));
        }
        return string;

    }

     async sendMail() {
        const mail = await this.transporter.sendMail(this.mailOptions, (e, data) => {
            if(e) {
                return console.log('Error', e);
            } else {
                console.log('Email sent!');
            }
            return mail;
        });
    }
    
}

module.exports = Email