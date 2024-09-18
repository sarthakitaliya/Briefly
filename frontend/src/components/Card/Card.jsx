import altImage from '../../assets/alt.jpg'
    import './Card.css'
        
    const Card = ({item, setPopupData, popupData}) => {
    const handleError = (e) => {
        e.target.src = altImage;
    };
    const handleClick = (item) => {
        setPopupData(item.content)
    }
    return (
        <div className='card'>
            <div className="summary" onClick={() => handleClick(item)}>
                <img src={item.urlToImage ? item.urlToImage : altImage} alt="An image" onError={handleError}/>
                <div className="text">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p> 
                </div>
            </div>
            <p className='source'>Source: <a
              href={item.url}
              target="_blank"
            >Read Full Article</a></p>
        </div>
    )
    }

    export default Card;