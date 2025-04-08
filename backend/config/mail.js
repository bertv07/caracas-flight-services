const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'caracas.flight.services.email@gmail.com',
        pass: 'onnj ozbi llyy ljwe'
    },
});
transporter.verify().then(() => {
    console.log('Ready for send emails');
});
module.exports = transporter;