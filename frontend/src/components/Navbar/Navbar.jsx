import React from 'react'
import './Navbar.css'

const Navbar = ({subscribePopup, setSubscribePopup}) => {
  return (
    <div className='navbar'>
        <h1>Briefly</h1>
        <button className='sub' onClick={() => setSubscribePopup(!subscribePopup)}>Subscribe</button>
    </div>
  )
}

export default Navbar