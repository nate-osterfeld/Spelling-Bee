import './GamePage.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { spellCorrect } from '@/utils/spellCorrect.js'
import { Keyboard } from '@/components/Keyboard.jsx'


function GamePage() {
	const { level } = useParams()
	
	// 1. `spelling` for user typed input; 2. `word` for randomly selected word; 3. `tries` for attempts
	const [spelling, setSpelling] = useState('')
	const [word, setWord] = useState('')
	const [tries, setTries] = useState(0)
	const [hints, setHints] = useState(0)
	
	// Get word by level
	const fetchWord = async () => {
		const word = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/words/?level=${level}`)
		setWord(word.data.word)
	}

	// Get word on initial page load
	useEffect(() => {
		fetchWord()
	}, [])

	// Play `word` once and for each time `setWord()` is called onSubmit if correct
	useEffect(() => {
		playWord(word)
	}, [word])

	// Use SpeechSynthesis browser API to play word
	const playWord = (word) => {
		const value = new SpeechSynthesisUtterance(word)
		window.speechSynthesis.cancel()
		window.speechSynthesis.speak(value)
		document.querySelector('input').focus()
	}

	// Called onSubmit: Checks if `spelling` === `word` and assigns new word if so
	const checkSpelling = async (e) => {
		document.querySelector('input').focus()
		e.preventDefault()

		// If spelling correct, else wrong
		if (spelling.toLowerCase() === word.toLowerCase()) {
			setTimeout(async () => {
				fetchWord()
				setSpelling('')
			}, 1000)

			document.querySelector('.game__input').classList.add('correct')
			setTimeout(() => {
				document.querySelector('.game__input').classList.remove('correct')
			}, 1100)

			// Save word to user history
			const isCorrect = (hints || tries) ? false : true
			
			await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/words/save`, {
				isCorrect,
				word,
			}, { withCredentials: true })

			setTries(0)
			setHints(0)
		} else {
			document.querySelector('.game__input').classList.add('wrong')
			setTimeout(() => {
				document.querySelector('.game__input').classList.remove('wrong')
			}, 1000)

			setTries(tries + 1)
		}
	}

	// onClick passed to keyboard to get key presses
	const keyboardFns = (e) => {
		const { className, classList } = e.target

		// Use bubbling so return if target is keyboard or press and not referencing a key
		const invalidVAlues = ['keyboard', 'press']
		for (const value of invalidVAlues) {
			if (className.includes([value])) {
				return
			}
		}

		// Add and remove color/shadows on keypress
		const pressElement = () => {
			classList.add('press')
			setTimeout(() => {
				classList.remove('press')
			}, 200)
		}

		const pressParentElement = () => {
			e.target.parentElement.classList.add('press')
			setTimeout(() => {
				e.target.parentElement.classList.remove('press')
			}, 200)
		}

		console.log(className)

		// delete, enter, hint, or character key press
		if (className === 'del' || className === 'backspace-svg') {
			className === 'del' 
				? pressElement() 
				: pressParentElement()

			// STATE: Delete a letter
			setSpelling((prev) =>
				prev.slice(0, prev.length - 1)
			)
		} else if (className === 'ent' || className === 'pencil-svg') {
			className === 'ent' 
				? pressElement() 
				: pressParentElement()
			
			// STATE: Potential new word
			checkSpelling(e)
		} else if (className === 'hnt' || className === 'lightbulb-svg') {
			className === 'hnt' 
				? pressElement() 
				: pressParentElement()
			
			// STATE: Corrects a letter
			setSpelling((prev) =>
				spellCorrect(word, prev)
			)
			setHints(hints + 1)
		} else {
			pressElement()
			
			// STATE: Adds normal a-z character to input
			setSpelling((prev) =>
				prev += className
			)
		}
	}

	return (
		<>
			<main className='game__main-section'>
				<div className='game__main-wrapper'>
					<div className='game__top'>
						<h1 className='game__h1'>Hear word again</h1>
						<img
							className='game__speaker-icon'
							src='/assets/speaker.svg'
							alt='speaker-icon'
							onClick={() => playWord(word)}
						/>
						<div className='game__tries'>Tries: {tries}</div>
					</div>

					<form className='game__form' onSubmit={checkSpelling}>
						<label className='game__label'>Type spelling here</label>
						<input
							className='game__input'
							spellCheck='false'
							disabled
							value={spelling}
						/>
						{/* <button>Check spelling</button> */}
						<Keyboard keyboardFns={keyboardFns} />
					</form>
				</div>
			</main>
		</>
	)
}

export default GamePage
