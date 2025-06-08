import './FavoritesPage.css'
import { useState, useEffect } from 'react'
import { useGetFavoriteWordsQuery, useRemoveFromFavoritesMutation } from '../../services/authSlice'
import FavoritesCard from './FavoritesCard'
import Loading from '../../components/Loading'

function FavoritesPage() {
    const { data, error: getWordError, isLoading } = useGetFavoriteWordsQuery()
    const [removeWordFromFavorites, { error: removeWordError }] = useRemoveFromFavoritesMutation()
    const [words, setWords] = useState([])

    useEffect(() => {
        setWords(data?.words)
    }, [isLoading])

    if (isLoading) {
        return <Loading />
    }

    function renderCards() {
        if (words) {
            if (words.length === 0) {
                return <div>No words to display</div>
            }

            return words.map((word, i) => (
                <FavoritesCard key={i} word={word} removeCard={removeCard} />
            ))
        }
    }

    async function removeCard(word_id) {
        try {
            await removeWordFromFavorites({ word_id }).unwrap()
            setWords((prev) => prev.filter((word) => word.id !== word_id))
        } catch (e) {
			// Error handled by RTK Query hook (accessible via `removeWordError.data`)
		}
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
