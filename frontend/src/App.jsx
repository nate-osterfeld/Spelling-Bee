import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import GamePage from './pages/game/GamePage'
import { Keyboard } from './components/Keyboard'
import Layout from './pages/Layout'
import ProgressPage from './pages/progress/ProgressPage'
import LeaderboardPage from './pages/leaderboard/LeaderboardPage'
// import { gameLoader } from './pages/game/gameLoader'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/play/:level', element: <GamePage /> },
      { path: '/progress', element: <ProgressPage /> },
      { path: '/leaderboard', element: <LeaderboardPage /> },
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
