import './LeaderboardPage.css'
import leftCaret from '../../assets/angle-left-icon.svg'
import rightCaret from '../../assets/angle-right-icon.svg'
import DonutChart from './DonutChart.jsx'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useGetLeaderboardQuery } from '../../services/authSlice.js'
import Loading from '../../components/Loading.jsx'

function LeaderboardPage() {
	const { page } = useParams()
	const navigate = useNavigate()
	const pageSize = 10

	const { data, error, isLoading } = useGetLeaderboardQuery({ page, pageSize })
	console.log('leaderboard', data)

	if (isLoading) {
        return <Loading />
	}

	if (error) {
		return (
			<div className='leaderboard-container'>
				Error loading leaderboard. Please try again later.
			</div>
		)
	}

	if (!data) {
		return <div className='leaderboard-container'>No leaderboard data available.</div>
	}

	return (
		<div className='leaderboard__main-section'>
			<div className='leaderboard__main-wrapper'>
				<h2 className='leaderboard-title'>High Scores</h2>

				<div className='table-container'>
					<table className='leaderboard-table'>
						<thead className='leaderboard-head'>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Solved</th>
								<th>Acceptance</th>
								<th>Score</th>
							</tr>
						</thead>
						<tbody>
							{data.ranks.map((user, index) => {
								const name = user.name
								const totalAttempts = user.total_attempts
								const totalSolved =
									parseInt(user.easy_correct_count) +
									parseInt(user.medium_correct_count) +
                                    parseInt(user.hard_correct_count)
                                
								const easyPercent = (
									(user.easy_correct_count / totalSolved) *
									100
                                ).toFixed(0)
                                
								const medPercent = (
									(user.medium_correct_count / totalSolved) *
									100
                                ).toFixed(0)
                                
								const hardPercent = (
									(user.hard_correct_count / totalSolved) *
                                    100
                                    
								).toFixed(0)
								const acceptancePercent = (
									(totalSolved / totalAttempts) *
									100
                                ).toFixed(2)
                                
								const score = (user.weighted_accuracy * 10000).toFixed(0)

								const chartData = [
									{
										value: parseInt(user.hard_correct_count),
										color: '#FF8B94',
										label: `Hard - ${hardPercent}%`,
									},
									{
										value: parseInt(user.easy_correct_count),
										color: '#A8E6CF',
										label: `Easy - ${easyPercent}%`,
									},
									{
										value: parseInt(user.medium_correct_count),
										color: '#FFD97D',
										label: `Medium - ${medPercent}%`,
                                    },
								]

								return (
									<tr key={user.user_id}>
										<td>{(page - 1) * pageSize + index + 1}</td>
										<td>
											<Link to={`/u/${user.user_id}`} className='leaderboard-user'>
												{name.charAt(0).toUpperCase() + name.slice(1)}
											</Link>
										</td>
										<td>
											<DonutChart
												data={chartData}
												legend={totalSolved}
												size={70}
												innerRadius={25}
											/>
										</td>
										<td>{acceptancePercent} %</td>
										<td>{score}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>

				<div className='leaderboard-pagination'>
					<button
						className='pagination-button'
						onClick={() => navigate(`/leaderboard/${Math.max(page - 1, 1)}`)}
						disabled={page === 1}
					>
                        <img src={leftCaret} className='angle-right' alt='next page' />
					</button>
					<span>{page} of {data.numOfPages}</span>
					<button
						className='pagination-button'
						onClick={() => navigate(`/leaderboard/${parseInt(page) + 1}`)}
						disabled={data.ranks.length < pageSize}
					>
                        <img src={rightCaret} className='angle-right' alt='next page' />
					</button>
				</div>
			</div>
		</div>
	)
}

export default LeaderboardPage
