import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import GamePage from './pages/game/GamePage'
import { Keyboard } from './components/Keyboard'
// import { gameLoader } from './pages/game/gameLoader'

const router = createBrowserRouter([
  // put navbar at top
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/play/:level',
    element: <GamePage />,
    // loader: gameLoader
  },
  {
    path: '/keyboard',
    element: <Keyboard />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
