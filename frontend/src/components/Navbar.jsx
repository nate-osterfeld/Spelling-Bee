import './Navbar.css'
import google_icon from '../assets/google-icon.svg'
import email_icon from '../assets/email-icon.svg'
import back_icon from '../assets/back-square-icon.svg'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HamburgerMenu from './Hamburger'

function Navbar() {
	const [showDropdown, setShowDropdown] = useState(false)
	const [showSignup, setShowSignup] = useState(false)

	return (
		<>
			<nav>
				<Link to='/'>
					<img className='home__bee-logo' src='/assets/bee-logo.png' alt='logo' />
				</Link>
				<div className='hamburger-menu'>
					<HamburgerMenu
						setShowDropdown={setShowDropdown}
						showDropdown={showDropdown}
						setShowSignup={setShowSignup}
						showSignup={showSignup}
					/>
				</div>
			</nav>
			{showDropdown && (
				<div className='signup-container'>
					<div className='signup'>
						<div className='signup__header'>Join SpeeBee!</div>
						<a
							href={`${import.meta.env.VITE_BACKEND_URL}/auth/google`}
							className='signup__method'
						>
							<img src={google_icon} alt='Google Logo' />
							Sign in with Google
							<div></div>
						</a>
						<button className='signup__method' onClick={() => setShowSignup(true)}>
							<img src={email_icon} alt='Google Logo' />
							Sign up with Email
							<div></div>
						</button>
						<div className='signup__account'>
							<div>Already have an account?</div>
							<div>Sign in</div>
						</div>
						<p className='signup__terms'>
							Click “Sign up” to agree to SpeeBee's{' '}
							<a href='#' rel='noopener follow' target='_blank'>
								Terms of Service
							</a>{' '}
							and acknowledge that SpeeBee's{' '}
							<a href='#' rel='noopener follow' target='_blank'>
								Privacy Policy
							</a>{' '}
							applies to you.
						</p>
					</div>
				</div>
			)}

			{showSignup && (
				<div className='signup-container'>
					<div className='signup'>
						<button className='signup__back' onClick={() => setShowSignup(false)}>
							<img src={back_icon} alt="Back Icon" />
						</button>
						<div className='signup__header2'>Sign up with email</div>
						<p className='signup__ptext'>Enter your email address and password to create an account.</p>
						<form>
							<label htmlFor=''>Email</label>
							<input className='signup__input' type='text' required />

							<label htmlFor=''>Password</label>
							<input className='signup__input' type='password' required />

							<label htmlFor=''>Password</label>
							<input className='signup__input' type='password' required />

							<button className='signup__submit' type='submit'>Submit</button>
						</form>

						<p className='signup__terms'>
							This site is protected by reCAPTCHA Enterprise and the{' '}
							<a href='https://policies.google.com/privacy' rel='noopener follow' target='_blank'>
								Google Privacy Policy
							</a>{' '}
							and{' '}
							<a href='https://policies.google.com/terms' rel='noopener follow' target='_blank'>
								Terms of Service
							</a>{' '}
							apply.
						</p>
					</div>
				</div>
			)}
		</>
	)
}

export default Navbar
