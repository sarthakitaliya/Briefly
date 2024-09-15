import { useEffect, useState } from 'react'
import './Popup.css'
import axios from 'axios'

const Popup = ({popupData, setPopupData}) => {

    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ;(async() => {
            if (popupData) {
                await generateSummary();
              }
        })()
      }, [popupData]);
    const handleClick = () => {
        setPopupData(null)
    }
    const generateSummary = async () => {
        const prompt = `Summarize the following news article to highlight the key points and main events.
                        Article Content: ${popupData}
                        Instructions:
                        Focus on the most important information and main events.
                        Keep the summary clear and concise.
                        Include key details such as who, what, when, where, and why.
                        Aim for a length of [desired word count or sentence length, e.g., "150-200 words"].
                        `;
        try {
            setLoading(true);
            const result = await axios({
                url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCypxmHQ6oWLDyxug0OFTPaZEGQNwv9Z74',
                method: "post",
                data: {
                    contents:[
                    {parts:[{text:prompt}]}],
                }
            })
            const summaryText = result.data.candidates[0].content.parts[0].text;
            setSummary(summaryText);
            setLoading(false);
        } catch (error) {
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
                <i class="fa-solid fa-xmark" onClick={handleClick}></i>
            </div>
            <h1>AI-Generated Article Summary:</h1>
            {loading && <p>Generating summary, please wait...</p>}
            {!loading && summary && <p>{summary}</p>}
        </div>
    )
  )
}

export default Popup
