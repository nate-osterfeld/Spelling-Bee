import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import GamePage from './pages/game/GamePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/play',
    element: <GamePage />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
