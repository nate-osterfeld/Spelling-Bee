import './FavoritesPage.css'
import { useState, useEffect } from 'react'
import { useGetFavoriteWordsQuery } from '../../services/authSlice'
import FavoritesCard from './FavoritesCard'
import Loading from '../../components/Loading'

function FavoritesPage() {
    const { data, error, isLoading } = useGetFavoriteWordsQuery()
    const [words, setWords] = useState([])

    useEffect(() => {
        setWords(data?.words)
    }, [isLoading])

    if (isLoading) {
        return <Loading />
    }

    function renderCards() {
        if (words) {
            return words.map((word, i) => (
                <FavoritesCard key={i} word={word} removeCard={removeCard} />
            ))
        }
    }

    function removeCard(id) {
        setWords((prev) => prev.filter((word) => word.id !== id))
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
