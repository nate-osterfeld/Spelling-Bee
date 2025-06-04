import './App.css'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import GamePage from './pages/game/GamePage'
import { Keyboard } from './components/Keyboard'
import Layout from './pages/Layout'
import AccountPage from './pages/account/AccountPage'
import ProgressPage from './pages/progress/ProgressPage'
import LeaderboardPage from './pages/leaderboard/LeaderboardPage'
import FavoritesPage from './pages/favorites/FavoritesPage'
// import { gameLoader } from './pages/game/gameLoader'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/play/:level', element: <GamePage /> },
      { path: '/account', element: <AccountPage /> },
      { path: '/progress', element: <ProgressPage /> },
      { path: '/u/:userId', element: <ProgressPage /> },
      { path: '/favorites', element: <FavoritesPage /> },
      { path: '/leaderboard', loader: () => redirect('/leaderboard/1') },
      { path: '/leaderboard/:page', element: <LeaderboardPage /> },
      { path: '/keyboard', element: <Keyboard /> }
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
