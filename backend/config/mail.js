const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'caracas.flight.services.email@gmail.com',
        pass: 'onnj ozbi llyy ljwe'
    },
});

module.exports = transporter;