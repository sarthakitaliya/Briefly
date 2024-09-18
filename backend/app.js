if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const { default: axios } = require("axios");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.listen(port);

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
