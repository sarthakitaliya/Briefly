import { useState } from 'react'
import './Subscribe.css'
import axios from 'axios';

const Subscribe = ({subscribePopup, setSubscribePopup}) => {
    const [email, setEmaiil] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:3000/api/subscribe', {email});
            setEmaiil('');
            setSubscribePopup(!subscribePopup)
        }catch(err){
            console.log("Error Subscribe", err);
        }
    }
    
  return (
    (
        subscribePopup &&
        <div className='sub-main'>
            <div className='sub-flex'>
                <div className="sub-container">
                    <i className="fa-solid fa-xmark" onClick={() => setSubscribePopup(!subscribePopup)}></i>
                    <div className="sub-text">
                        <h1 className='heading'>Subscribe to our newsletter</h1>
                        <form action="" onSubmit={handleSubmit}>
                            <input type="email" placeholder="Email Address" onChange={(e) => setEmaiil(e.target.value)} value={email}/>
                            <br />
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