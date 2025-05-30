import './LeaderboardPage.css';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetLeaderboardQuery } from '../../services/authSlice.js';

function LeaderboardPage() {
    const { page } = useParams()
    const navigate = useNavigate()
    const pageSize = 5

    const { data, error, isLoading } = useGetLeaderboardQuery({ page, pageSize });
    console.log('leaderboard', data);

    if (isLoading) {
        return <div className="leaderboard-container">Loading leaderboard...</div>;
    }

    if (error) {
        return <div className="leaderboard-container">Error loading leaderboard. Please try again later.</div>;
    }

    if (!data || !Array.isArray(data)) {
        return <div className="leaderboard-container">No leaderboard data available.</div>;
    }

    return (
        <div className="leaderboard-container">
            <h2 className="leaderboard-title">Leaderboard</h2>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Easy Correct</th>
                        <th>Medium Correct</th>
                        <th>Hard Correct</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={user.user_id}>
                            <td>{(page - 1) * pageSize + index + 1}</td>
                            <td>{user.email}</td>
                            <td>{user.easy_correct_count}</td>
                            <td>{user.medium_correct_count}</td>
                            <td>{user.hard_correct_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-controls">
                <button
                    className="pagination-button"
                    onClick={() => navigate(`/leaderboard/${Math.max(page - 1, 1)}`)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span>Page {page}</span>
                <button
                    className="pagination-button"
                    onClick={() => navigate(`/leaderboard/${parseInt(page) + 1}`)}
                    disabled={data.length < pageSize}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default LeaderboardPage;
