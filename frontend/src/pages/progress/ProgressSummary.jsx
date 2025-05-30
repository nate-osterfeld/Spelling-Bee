import './ProgressSummary.css'
import handsClapping from '../../assets/hands-clapping-icon.svg'

function ProgressSummary({ data, percentile }) {
	const totalCorrect = data.filter((obj) => obj.is_correct === 'Accepted')

    const easy = totalCorrect.filter(({ level }) => level === 'easy')
    const medium = totalCorrect.filter(({ level }) => level === 'medium')
    const hard = totalCorrect.filter(({ level }) => level === 'hard')

	return (
		<div className='progress-summary'>
			<h3 className='progress-summary-title'>Summary</h3>

			<div className='total-solved'>
				<div className='total-solved__row-1'>Total solved</div>
				<div className='total-solved__row-2'>
					<div>
						{totalCorrect.length} <span>Words</span>
					</div>
					<div>
						<img src={handsClapping} className='hands-clapping' alt='hands clapping' />
						Beats {percentile.toFixed(2)}%
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
						{((totalCorrect.length / data.length || 0) * 100).toFixed(2)}
						<span>%</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProgressSummary
