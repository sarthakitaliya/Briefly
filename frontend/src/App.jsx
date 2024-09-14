import './App.css'
import Navbar from './components/Navbar/Navbar';
import Categories from './components/Categories/Categories.jsx';
import CardPage from './components/CardPage/CardPage.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from './components/Popup/Popup.jsx';


function App() {
  
  const [category, setCategory] = useState("latest")
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const fetchCategoryData = async () => {
    try {
      setError(false);
      setLoading(true);
      const response = await axios.get(`https://briefly-yqee.onrender.com/api/${category}`); 
      setData(response.data.articles);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.error('Error fetching data:', error);
      setData([]); 
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();     
  }, [category]);

  return (
    <>
      <Navbar />
      <Popup popupData={popupData} setPopupData={setPopupData} />
      <Categories category={category} setCategory={setCategory} />  
      <CardPage loading={loading} data={data} error={error} popupData={popupData} setPopupData={setPopupData} />
    </>
  )
}

export default App
