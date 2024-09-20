if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const { default: axios } = require("axios");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const nodeCron = require('node-cron');  
const dburl = process.env.DB_URL;
const subscriber = require("./model/subscriber");
const { sendWelcomeEmail, sendDailyNews, fetchNews } = require("./subscription");

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.listen(port);


main().then(() => {
  console.log("connected to DB")
})
.catch((err) => {
  console.log(err);
})
async function main(){
  await mongoose.connect(dburl);
}


async function makeApiRequest(url) {
  try {
    const response = await axios.get(url);
    return {
      status: 200,
      success: true,
      message: "Data fetched successfully",
      data: response.data,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Failed to fetch data from the API",
    };
  }
}
app.get("/all-news", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  let q = req.query.q || "world"; // Default search query if none provided

  let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    q
  )}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

app.get("/api/top-headlines", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  let category = req.query.category || "general";

  let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

app.post("/api/generate-summary", async (req, res) => {  
  const { articleText } = req.body;
  
  const prompt = `Summarize the following news article to highlight the key points and main events.
                  Article Content: ${articleText}
                  Instructions:
                  Focus on the most important information and main events.
                  Keep the summary clear and concise.
                  Include key details such as who, what, when, where, and why.
                  don't include any other word just give me summary
                  Aim for a length of 150-200 words.`;

  try {
    const result = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      method: "post",
      data: {
        contents: [{ parts: [{ text: prompt }] }],
      },
    });
    const summaryText = result.data.candidates[0].content.parts[0].text;
    res.json({ summary: summaryText });
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ error: 'An error occurred while generating the summary.' });
  }
});

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  try{
    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }
    const existingSubscriber = await subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'You are already subscribed!' });
    }
    
    const newSubscriber = new subscriber({email});
    await newSubscriber.save();
    sendWelcomeEmail(email);
    res.status(200).json({ message: 'Subscription successful', email: email  });

  }catch (error) {
    console.error('Error handling subscription:', error);
    return res.status(500).json({message: 'Internal server error'});
  }
});

try {
  nodeCron.schedule('40 9 * * *', () => {
    console.log('Sending daily news...');
    sendDailyNews();
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });
} catch (error) {
  console.log("Internal error from subscription", error);
}
  
