import './App.css'
import Navbar from './components/Navbar/Navbar';
import Categories from './components/Categories/Categories.jsx';
import CardPage from './components/CardPage/CardPage.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from './components/Popup/Popup.jsx';
import Subscribe from './components/Subscribe/Subscribe.jsx';


function App() {
  
  const [category, setCategory] = useState("general")
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [popupData, setPopupData] = useState("");
  const [subscribePopup, setSubscribePopup] = useState(false);

  async function fetchNews() {
    try {
      setError(false);
      setLoading(true);
      const response = await axios.get(`https://briefly-yqee.onrender.com/api/top-headlines?category=${category}`)
      setNews(response.data);      
      setLoading(false);
    } catch (error) {
      setError(true);
      console.error('Error fetching data:', error);
      setData([]); 
      setLoading(false);
    }
  }
  

  useEffect(() => {
    fetchNews();     
  }, [category]);
  
  return (
    <>
      <Navbar subscribePopup={subscribePopup} setSubscribePopup={setSubscribePopup} />
      <Subscribe subscribePopup={subscribePopup} setSubscribePopup={setSubscribePopup} />
      <Popup popupData={popupData} setPopupData={setPopupData} />
      <Categories category={category} setCategory={setCategory} />  
      <CardPage loading={loading} news={news} error={error} popupData={popupData} setPopupData={setPopupData} />
    </>
  )
}

export default App
