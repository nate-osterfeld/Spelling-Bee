import './ProgressPage.css'
import React, { useEffect, useState } from 'react'
import { useGetUserProgressQuery } from '../../services/authSlice.js'
import ProgressTable from './ProgressTable.jsx'

function ProgressPage() {
	const { data, error, isLoading } = useGetUserProgressQuery()
	const [progressData, setProgressData] = useState([])
	console.log('data', data)

	useEffect(() => {
		if (data && !isLoading) {
			const formattedData = data.data.map((obj) => {
				const formattedDate = new Date(obj.created_at).toLocaleString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				})

				let correct = parseInt(obj.correct)
				let incorrect = parseInt(obj.incorrect)
				const formattedAcceptance =
					Math.round((correct / (correct + incorrect)) * 10000) / 100

				return {
					...obj,
					created_at: formattedDate,
					acceptance: formattedAcceptance,
				}
			})

			setProgressData(formattedData)
		}
	}, [data])

	return (
		<>
			<main className='progress__main-section'>
				<div className='progress__main-wrapper'>
					{progressData.length && (
						<ProgressTable data={progressData} isLoading={isLoading} error={error} />
					)}
				</div>
			</main>
		</>
	)
}

export default ProgressPage
