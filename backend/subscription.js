const nodemailer = require('nodemailer');
const nodeCron = require('node-cron');  
const Subscriber = require('./model/subscriber');
const axios = require("axios");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true, 
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

module.exports.sendWelcomeEmail = (email) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Briefly!',
      html: ` <html>
                    <body style="font-family: Arial, sans-serif; color: #333;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                            <h1 style="color: rgb(190, 65, 65); text-align: center;">Briefly</h1>
                            <h1>Welcome to Briefly</h1>
                            <p>Thanks for subscribing! You’ll receive daily news updates from now on.</p>
                       </div>
                    </body>
              </html>`,
    };
  
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending welcome email:', err);
      } else {
        console.log('Welcome email sent:', info.response);
      }
    });
  }

const fetchNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?category=general&language=en&apiKey=${process.env.API_KEY}`
    const response = await axios.get(url)
    return response.data.articles.slice(0, 5);
}

module.exports.sendDailyNews = async() => {
    const news = await fetchNews();
    const newsHtml = news.map(article => `
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin-bottom: 20px; background-color: #f9f9f9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="font-size: 24px; color: #333; margin-top: 0;">${article.title}</h2>
          <p style="font-size: 16px; color: #666; line-height: 1.6;">${article.description}</p>
          <img src="${article.urlToImage}" alt="${article.title}" style="max-width: 100%; height: auto; border-radius: 4px; margin-top: 10px; margin-bottom: 10px;" />
          <a href="${article.url}" style="display: inline-block; font-size: 16px; color: #007bff; text-decoration: none; font-weight: bold;">Read more</a>
        </div>
      `).join('');
  
    // Fetch all subscribers from MongoDB
    const subscribers = await Subscriber.find();
  
    subscribers.forEach(subscriber => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: subscriber.email,
        subject: 'Daily News Update',
        html: newsHtml,
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Error sending daily news email:', err);
        } else {
          console.log('Daily news email sent to', subscriber.email, info.response);
        }
      });
    });
  }
  

