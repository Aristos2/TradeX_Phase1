import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import ProtectedRoute from './routes/ProtectedRoute'

import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Funds from './pages/funds'
import Holdings from './pages/Holdings'
import Positions from './pages/positions'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes: no Navbar, no Sidebar */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes: Navbar + Sidebar */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App