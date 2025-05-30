import './ProgressPage.css'
import React, { useEffect, useState } from 'react'
import { useGetUserProgressQuery } from '../../services/authSlice.js'
import ProgressSummary from './ProgressSummary.jsx'
import ProgressTable from './ProgressTable.jsx'
import Loading from '../../components/Loading.jsx'

function ProgressPage() {
	const { data, error, isLoading } = useGetUserProgressQuery()
	const [progressData, setProgressData] = useState([])
	const [percentile, setPercentile] = useState(0)
	console.log('progress data', data)

	useEffect(() => {
		if (data && !isLoading) {
			const formattedData = data.data.map((obj) => {

				let correct = parseInt(obj.correct)
				let incorrect = parseInt(obj.incorrect)
				const formattedAcceptance =
					Math.round((correct / (correct + incorrect)) * 10000) / 100

				const formattedCorrectness = obj.is_correct ? 'Accepted' : 'Wrong Answer'

				return {
					...obj,
					acceptance: formattedAcceptance,
					is_correct: formattedCorrectness
				}
			})

			setProgressData(formattedData)
			setPercentile(data.percentile ?? 0)
		}
	}, [isLoading])

	return (
		<>
			<main className='progress__main-section'>
				<div className='progress__main-wrapper'>
					{isLoading ? (
						<Loading />
					) : (
						<>
							<ProgressSummary data={progressData} percentile={percentile} />
							<ProgressTable data={progressData} isLoading={isLoading} error={error} />
						</>
					)}
				</div>
			</main>
		</>
	)
}

export default ProgressPage
