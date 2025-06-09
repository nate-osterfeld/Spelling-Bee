import './FavoritesCard.css'
import speakerWhite from '../../assets/speakerWhite.svg'
import trash from '../../assets/trash-icon.svg'

function FavoritesCard({ word, removeCard }) {
	const playWord = (word) => {
		const value = new SpeechSynthesisUtterance(word)
		window.speechSynthesis.cancel()
		window.speechSynthesis.speak(value)
		document.querySelector('input').focus()
	}

    function renderWordMeanings(wordData) {
		return wordData.meanings.map((wd) => {
			return (
				<>
					<div className='word-class'>{wd?.partOfSpeech}</div>
					{wd.definitions.map((def) => {
						return (
							<>
								<div className='word-definition'>
									{def.definition}
								</div>
                                <div className='word-example'>
                                    {def.example}
                                </div>
							</>
						)
					})}
				</>
			)
		})
	}

	return (
		<div className='word-container'>
			<div className='word-header'>
				<div className='word-header-left'>
					<div className='word__speaker-icon-wrapper' onClick={() => playWord(word.word)}>
						<img className='word__speaker-icon' src={speakerWhite} alt='speaker-icon' />
					</div>
					<div className='word-header-main'>
						<div className='word-word'>{word.data.syllables}</div>
						<div className='word-phonetic'>{word.data.phonetic}</div>
					</div>
				</div>
				<div className='word-header-right'>
					<div className={`word-difficulty ${word.level}`}>{word.level}</div>
					<div className='word-correctness'>
						🎯{' '}
						{Math.round(
							(parseInt(word.correct) /
								(parseInt(word.correct) + parseInt(word.incorrect))) *
								100,
						)}
						%
					</div>
				</div>
			</div>
			<div className='word-body'>
				{renderWordMeanings(word.data)}
				<div className='word-class'>origin</div>
				<div className='word-origin'>{word.data.origin}</div>
            </div>
            <div
                onClick={() => removeCard(word.id)}
                className="word-delete"
            >
                <img src={trash} alt="" />
            </div>
		</div>
	)
}

export default FavoritesCard
