import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

function App() {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/map" replace />} />
    </Routes>
  )
}

export default App