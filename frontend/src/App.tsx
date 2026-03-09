import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import AuthPage from './pages/AuthPage'

function App() {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
    </Routes>
  )
}

export default App