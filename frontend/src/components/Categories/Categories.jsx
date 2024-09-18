import { useState } from 'react'
import './Categories.css'

const Categories = ({category, setCategory}) => {
    
    return (
    <div className="pad">
        <div className="main">
            <div className='category'>
                <div className={category == 'general' ? 'active' : ''}>
                    <h2 onClick={() => setCategory('general')}>Latest</h2>
                </div>
                <div className={category == 'technology' ? 'active' : ''}>
                    <h2 onClick={() => setCategory('technology')}>Technology</h2>
                </div>
                <div className={category == 'business' ? 'active' : ''}>
                    <h2 onClick={() => setCategory('business')}>Business</h2>
                </div>
                <div className={category == 'sports' ? 'active' : ''}>
                    <h2 onClick={() => setCategory('sports')}>Sports</h2>
                </div>
                <div className={category == 'health' ? 'active' : ''}>
                    <h2 onClick={() => setCategory('health')}>Health</h2>
                </div>
                <div className={category == 'science' ? 'active' : ''}>
                    <h2 onClick={() => setCategory('science')}>science</h2>
                </div>
                <div className={category == 'entertainment' ? 'active' : ''}>
                    <h2 onClick={() => setCategory('entertainment')}>Entertainment</h2>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Categories