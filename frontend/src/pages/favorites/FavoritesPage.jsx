import './FavoritesPage.css'
import { useGetFavoriteWordsQuery } from '../../services/authSlice'
import Loading from '../../components/Loading'

function FavoritesPage() {
	const { data, error, isLoading } = useGetFavoriteWordsQuery()

    console.log('data', data)   

    if (isLoading) {
        return <Loading />
    }
    
    return (
        <div>
            {data.words.length}
        </div>
    )
}

export default FavoritesPage