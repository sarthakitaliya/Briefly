if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const express = require("express");
const app = express();
const cors = require('cors');
const {latest, technology, sports, politics, economy} = require("./newsAPI.js");
const { default: axios } = require('axios');
const port = process.env.PORT || 3000;


app.use(cors());

app.listen(port);

app.get('/api/latest', async(req, res) => {
    const news = await latest();
    res.send(news);
});

app.get('/api/technology', async(req, res) => {
    const respon = await axios.get('https://newsapi.org/v2/top-headlines?language=en&category=technology&apiKey=1e730fbc4f824cc0a59dcb4cc9341269')
    res.send(respon.data)
})

app.get('/api/sport', async (req, res) => {
    const respon = await axios.get('https://newsapi.org/v2/top-headlines?language=en&category=sport&apiKey=1e730fbc4f824cc0a59dcb4cc9341269')
    res.send(respon.data)
})
app.get('/api/politics', async (req, res) => {
    const news = await politics();
    res.send(news)
})
app.get('/api/economy', async (req, res) => {
    const news = await economy();
    res.send(news)
})

  

