import './HomePage.css'
import ButtonLevel from '@/components/ButtonLevel'

function HomePage() {
	return (
		<>
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
