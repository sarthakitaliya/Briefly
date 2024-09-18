import { useEffect, useState } from 'react'
import './Popup.css'
import axios from 'axios'

const Popup = ({popupData, setPopupData}) => {

    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ;(async() => {
            if(popupData){
                await generateSummary()
            }
        })()
      }, [popupData]);
    const handleClick = () => {
        setPopupData(null)
    }
    const generateSummary = async () => {
        try{
            setLoading(true);
            const response = await axios.post('http://localhost:3000/api/generate-summary', {
                articleText: popupData
            });            
            setSummary(response.data.summary);
            setLoading(false)
        }catch(error){
            setLoading(false);
            console.error('Error generating summary:', error);
            setSummary('Sorry, an error occurred while generating the summary.');
        }
    }
    
  return (
    (
        popupData &&
        <div className="pop-up">
            <div className="x-mark">
                <i className="fa-solid fa-xmark" onClick={handleClick}></i>
            </div>
            <h1>AI-Generated Article Summary:</h1>
            {loading && <p>Generating summary, please wait...</p>}
            {!loading && summary && <p>{summary}</p>}
        </div>
    )
  )
}

export default Popup
