import './FavoritesCard.css'
import speakerWhite from '../../assets/speakerWhite.svg'

function FavoritesCard({ word }) {
    console.log('word', word)
    
    const playWord = (word) => {
		const value = new SpeechSynthesisUtterance(word)
		window.speechSynthesis.cancel()
		window.speechSynthesis.speak(value)
		document.querySelector('input').focus()
	}

	return (
		<div className='word-container'>
			<div className='word-header'>
				<div className='word-header-left'>
					{/* <div className='word-header-audio'>🔊</div> */}
                    <div
                        className='word__speaker-icon-wrapper'
                        onClick={() => playWord(word.word)}
                    >
						<img
							className='word__speaker-icon'
							src={speakerWhite}
							alt='speaker-icon'
						/>
					</div>
					<div className='word-header-main'>
						<div className='word-word'>tu·tor</div>
						<div className='word-phonetic'>/ˈto͞odər/</div>
					</div>
				</div>
				<div className='word-header-right'>
					<div className='word-difficulty'>Easy</div>
					<div className='word-correctness'>🎯 85%</div>
				</div>
			</div>
			<div className='word-body'>
				<div className='word-class'>noun</div>
				<div className='word-definition'>
					A private teacher, typically one who teaches a single student or a very small
					group.
				</div>
				<div className='word-example'>"She hired a math tutor for extra help."</div>
				<div className='word-class'>verb</div>
				<div className='word-definition'>To act as a tutor to someone; to teach.</div>
				<div className='word-example'>"He tutored her in French."</div>
				<div className='word-class'>origin</div>
				<div className='word-origin'>
					Late Middle English from Latin tutor watcher, guardian.
				</div>
			</div>
		</div>
	)
}

export default FavoritesCard
