import './ProgressSummary.css'
import handsClapping from '../../assets/hands-clapping-icon.svg'

function ProgressSummary({ data, percentile }) {
    const total = Array.from(
		new Map(
			data
				.filter((obj) => obj.is_correct === 'Accepted') // Only include "Accepted" objects
				.map((obj) => [obj.word, obj]), // Map words to their objects
		).values(),
	)

    const easy = total.filter(({ level }) => level === 'easy')
    const medium = total.filter(({ level }) => level === 'medium')
    const hard = total.filter(({ level }) => level === 'hard')

	return (
		<div className='progress-summary'>
			<h3 className='progress-summary-title'>Summary</h3>

			<div className='total-solved'>
				<div className='total-solved__row-1'>Total solved</div>
				<div className='total-solved__row-2'>
					<div>
						{total.length} <span>Words</span>
					</div>
					<div>
						<img src={handsClapping} className='hands-clapping' alt='hands clapping' />
						Beats {percentile}%
					</div>
				</div>
				<div className='total-solved__row-3'>
					<div className='row-3__easy'>
						<span>Easy</span>
						<span>{easy.length}</span>
					</div>
					<div className='row-3__medium'>
						<span>Medium</span>
						<span>{medium.length}</span>
					</div>
					<div className='row-3__hard'>
						<span>Hard</span>
						<span>{hard.length}</span>
					</div>
				</div>
			</div>

			<div className='submissions-acceptance'>
				<div className='submissions'>
					<div className='submissions-title'>Submissions</div>
					<div className='submissions-count'>{data.length}</div>
				</div>
				<div className='acceptance'>
					<div className='acceptance-title'>Acceptance</div>
					<div className='acceptance-count'>
						{(total.length / data.length).toFixed(3) * 100}
						<span>%</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProgressSummary
