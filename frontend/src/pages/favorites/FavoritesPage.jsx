import './FavoritesPage.css'
import { useGetFavoriteWordsQuery } from '../../services/authSlice'
import FavoritesCard from './FavoritesCard'
import Loading from '../../components/Loading'

function FavoritesPage() {
    const { data, error, isLoading } = useGetFavoriteWordsQuery()

    if (isLoading) {
        return <Loading />
    }

    function renderCards() {
        return data?.words.map((word, i) => (
             <FavoritesCard key={i} word={word} />
        ))
    }
    
    return (
        <div className='favorites__main-section'>
            <div className="favorites__main-wrapper">
                {renderCards()}
            </div>
        </div>
    )
}

export default FavoritesPage
