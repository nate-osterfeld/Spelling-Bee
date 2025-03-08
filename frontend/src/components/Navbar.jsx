import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
		<nav>
			<Link to='/'>
				<img className='home__bee-logo' src='/assets/bee-logo.png' alt='logo' />
			</Link>
			<div className='hamburger-menu'>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</nav>
	)
}

export default Navbar
