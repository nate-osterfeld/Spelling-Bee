import './FavoritesPage.css'
import { useGetFavoriteWordsQuery } from '../../services/authSlice'
import FavoritesCard from './FavoritesCard'
import Loading from '../../components/Loading'

function FavoritesPage() {
	const { data, error, isLoading } = useGetFavoriteWordsQuery()
    const example = data?.words[5]

    // console.log('data', data)   

    if (isLoading) {
        return <Loading />
    }
    
    return (
        <div className='favorites__main-section'>
            <div className="favorites__main-wrapper">
                <FavoritesCard word={example} />
            </div>
        </div>
    )
}

export default FavoritesPage
