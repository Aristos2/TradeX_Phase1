import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Removed unused HashRouter
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'; // 👈 Import the Sidebar
import Dashboard from './pages/Dashboard';
import Funds from './pages/funds';
import Holdings from './pages/Holdings';
import Positions from './pages/positions';

function App() {
  return (
      <BrowserRouter>
        {/* Main wrapper for the layout */}
        <div className="app-container">
          
          {/* Navbar sits at the top */}
          <Navbar />
          
          {/* Body splits into Left (Sidebar) and Right (Main Content) */}
          <div className="app-body">
            
            <Sidebar />
            
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/funds" element={<Funds />} />
                <Route path="/holdings" element={<Holdings />} />
                <Route path="/positions" element={<Positions />} />
              </Routes>
            </div>
            
          </div>
        </div>
      </BrowserRouter>
  )
}

export default App