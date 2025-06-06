import './ProgressPage.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserProgressQuery, useGetUserProgressByIdQuery } from '../../services/authSlice.js'
import ProgressSummary from './ProgressSummary.jsx'
import ProgressTable from './ProgressTable.jsx'
import Loading from '../../components/Loading.jsx'

// NOTE: This page is loaded on 2 routes! (/progress and /u/:userId)
//       1) If route param `userId` exists -> run "byId" rtkq hook to retrieve specific user
//       2) If route param `userId` doesn't exit -> run "current" rtqk hook to retrieve current user signed in
function ProgressPage() {
	const { userId } = useParams()

	const byIdResult = useGetUserProgressByIdQuery({ userId }, { skip: !userId }) // skip call if userId doesn't exist (returns specific user)
	const currentResult = useGetUserProgressQuery({ skip: !!userId }) // skip call if userId does exist (returns user signed in)

	const data = userId ? byIdResult.data : currentResult.data
	const error = userId ? byIdResult.error : currentResult.error
	const isLoading = userId ? byIdResult.isLoading : currentResult.isLoading

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
					isCurrentUser: Boolean(!userId),
					acceptance: formattedAcceptance,
					is_correct: formattedCorrectness
				}
			})

			setProgressData(formattedData)
			setPercentile(data.percentile ?? 0)
		}
	}, [data, isLoading])

	return (
		<>
			<main className='progress__main-section'>
				<div className='progress__main-wrapper'>
					{isLoading ? (
						<Loading />
					) : (
						<>
							<h1 className='progress__username'>{data.username}</h1>
							<ProgressSummary data={progressData} percentile={percentile} />
							<ProgressTable data={progressData} />
						</>
					)}
				</div>
			</main>
		</>
	)
}

export default ProgressPage
