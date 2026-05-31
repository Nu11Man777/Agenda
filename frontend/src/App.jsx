import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { clearAuth, getAuth } from './authStorage.js'

export default function App() {
  const [token, setToken] = useState(() => getAuth().token)

  useEffect(() => {
    function onStorage(e) {
      if (e.key === 'auth') setToken(getAuth().token)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const isAuthed = Boolean(token)

  function handleAuthed() {
    setToken(getAuth().token)
  }

  function handleLogout() {
    clearAuth()
    setToken(null)
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthed ? '/dashboard' : '/login'} replace />}
      />

      <Route path="/login" element={<Login onAuthed={handleAuthed} />} />
      <Route path="/signup" element={<Signup onAuthed={handleAuthed} />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthed={isAuthed}>
            <Dashboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to={isAuthed ? '/dashboard' : '/login'} replace />}
      />
    </Routes>
  )
}
