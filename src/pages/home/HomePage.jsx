import './HomePage.css'
import ButtonLevel from '../../components/ButtonLevel'

function HomePage() {
	return (
		<>
			<nav>
				<img
					className='home__bee-logo'
					src='/assets/bee-logo.png' alt='logo' />
				<div className='hamburger-menu'>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</nav>

			{/* Main Section */}
			<main className='home__main-section'>
				<div className='home__main-wrapper'>
					<h1 className='home__h1'>Spelling Bee</h1>
					<div className='levels'>
						<ButtonLevel level='easy' />
						<ButtonLevel level='medium' />
						<ButtonLevel level='hard' />
						<ButtonLevel level='all' />
					</div>
				</div>
			</main>
		</>
	)
}

export default HomePage
