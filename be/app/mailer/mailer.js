import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'scottom420@gmail.com',
        pass: 'dtdk pgir jblt appu'
    }
});


export function sendEmail(email, body) {
    const mailOptions = {
        from: 'scottom420@gmail.com',
        to: email,
        subject: "instaApp account verification",
        text: body,
    };



    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

