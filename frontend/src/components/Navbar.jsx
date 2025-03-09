import './Navbar.css'
import google_icon from '../assets/google-icon.svg'
import email_icon from '../assets/email-icon.svg'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HamburgerMenu from './Hamburger'

function Navbar() {
	const [showDropdown, setShowDropdown] = useState(false)

	return (
		<>
			<nav>
				<Link to='/'>
					<img className='home__bee-logo' src='/assets/bee-logo.png' alt='logo' />
				</Link>
				<div className='hamburger-menu'>
					<HamburgerMenu setShowDropdown={setShowDropdown} showDropdown={showDropdown} />
				</div>
			</nav>
			{showDropdown && (
				<div className='signup-container'>
					<div className='signup'>
						<div className='signup__header'>Join SpeeBee!</div>
						<a href='/auth/google' className='signup__method'>
							<img src={google_icon} alt='Google Logo' />
							Sign in with Google
							<div></div>
						</a>
						<button href='/auth/google' className='signup__method'>
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
		</>
	)
}

export default Navbar
