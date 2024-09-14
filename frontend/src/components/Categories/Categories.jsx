import { useState } from 'react'
import './Categories.css'

const Categories = ({category, setCategory}) => {
    
    return (
    <div className="pad">
        <div className="main">
            <div className='category'>
                <div className={category == 'latest' ? 'active' : ''}>
                    <h2 onClick={() => setCategory('latest')}>Latest</h2>
                </div>
                <div className={category == 'technology' ? 'active' : ''}>
                    <h2 onClick={() => setCategory('technology')}>Technology</h2>
                </div>
                <div className={category == 'sport' ? 'active' : ''}>
                    <h2 onClick={() => setCategory('sport')}>Sport</h2>
                </div>
                <div className={category == 'politics' ? 'active' : ''}>
                    <h2 onClick={() => setCategory('politics')}>Politics</h2>
                </div>
                <div className={category == 'economy' ? 'active' : ''}>
                    <h2 onClick={() => setCategory('economy')}>Economy</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Categories