    import altImage from '../../assets/alt.jpg'
    import './Card.css'
        
    const Card = ({item, setPopupData}) => {
    const handleError = (e) => {
        e.target.src = altImage; // Set the fallback image if the original fails to load
    };
    if(item.title == "[removed]"){
        return <h1>Not available</h1>
    }
    const handleClick = (item) => {
        setPopupData(item.content)
    }
    return (
        <div className='card' onClick={() => handleClick(item)}>
            <img src={item.urlToImage ? item.urlToImage : altImage} alt="An image" onError={handleError}/>
            <div className="text">
            <h3>{item.title}</h3>
            <p>{item.description}</p> 
            </div>
        </div>
    )
    }

    export default Card;