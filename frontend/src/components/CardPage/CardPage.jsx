import './CardPage.css'
import Card from '../Card/Card'

const CardPage = ({data, loading, error, popupData, setPopupData}) => {
    if(error){
        return(
            <div className='error'>
                <h1>Something went wrong</h1>
            </div>
        )
    }
    if (loading) {
        return (
            <div className="loading">
                <h1>Loading...</h1>
            </div>
        )
    }
    return (
    <div className='card-page'>
        {data && data.length > 0 ? (
        data.map((item, idx) => (
          <Card key={idx} item={item} setPopupData={setPopupData} /> // Render each card
        ))
        ) : (
        <div className="not-av">
            <h1>No data available for this category</h1>
        </div>
      )}
    </div>
  )
}

export default CardPage