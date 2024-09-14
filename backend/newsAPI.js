if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const NewsAPI = require('newsapi');
const ApiKey = process.env.API_KEY;
const newsapi = new NewsAPI(ApiKey);

module.exports.latest = async() => { 
    const news = await newsapi.v2.everything({
    q: 'india',
    language: 'en',
    sortBy: 'publishedAt'
    });
    return news;
}

module.exports.technology = async() => {
    const news = await newsapi.v2.everything({
        q: 'technology',
        sortBy: 'publishedAt',
        language: 'en'
    });
    return news;
}

module.exports.sports = async () => {
    const news = await newsapi.v2.everything({
        q: "sports - india",
        sortBy: 'publishedAt',
        language: 'en'
    });
    return news;
}
module.exports.politics = async () => {
    const news = await newsapi.v2.everything({
        q: "politics - india",
        sortBy: 'publishedAt',
        language: 'en'
    });
    return news;
}
module.exports.economy = async () => {
    const news = await newsapi.v2.everything({
        q: "economy",
        sortBy: 'publishedAt',
        language: 'en'
    });
    return news;
}