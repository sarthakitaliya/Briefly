import './CardPage.css'
import Card from '../Card/Card'

const CardPage = ({news, loading, error, popupData, setPopupData}) => {
    if(error){
        return(
            <div className='error'>
                <h1>{news.message}</h1>
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
        {news.data ? (
        news.data.articles.map((item, idx) => {
            if(item.title !== '[Removed]' && item.description !== '[Removed]') {
                return <Card key={idx} item={item} setPopupData={setPopupData} popupData={popupData} />;
            }
        })
        ) : (
        <div className="not-av">
            <h1>No data available for this category</h1>
        </div>
      )}
    </div>
  )
}

export default CardPage