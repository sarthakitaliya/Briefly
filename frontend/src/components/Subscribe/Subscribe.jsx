import { useState } from 'react'
import './Subscribe.css'
import axios from 'axios';

const Subscribe = ({subscribePopup, setSubscribePopup}) => {
    const [email, setEmaiil] = useState("");
    const [response, setResponse] = useState(''); 

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email); 
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!email) {
            setResponse('Email address is required');
            return;
        } else if (!validateEmail(email)) {
            setResponse('Please enter a valid email address');
            return;
        } else {
            setResponse(''); 
        }
        try{
            let res = await axios.post('https://briefly-yqee.onrender.com/api/subscribe', {email});
            setResponse(res.data.message);
            setEmaiil('');
            setTimeout(() => {
                setSubscribePopup(false);
                setResponse('');
            }, 1000);
        }catch(err){
            if (err.response && err.response.data) {
                setResponse(err.response.data.message); 
            } else {
                setResponse('Failed to subscribe. Please try again.');
            }
        }
    }
    
    const handleClick = () => {
        setResponse('');
        setEmaiil('');
        setSubscribePopup(false) 
    }
  return (
    (
        subscribePopup &&
        <div className='sub-main'>
            <div className='sub-flex'>
                <div className="sub-container">
                    <i className="fa-solid fa-xmark" onClick={handleClick}></i>
                    <div className="sub-text">
                        <h1 className='heading'>Subscribe to our newsletter</h1>
                        <form action="" onSubmit={handleSubmit}>
                            <input type="email" placeholder="Email Address" onChange={(e) => setEmaiil(e.target.value)} value={email}/>
                            <br />
                            <p className="sub-res">{response}</p>
                            <button>Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
  )
}

export default Subscribe
