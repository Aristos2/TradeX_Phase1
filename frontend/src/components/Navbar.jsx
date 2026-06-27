import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { getProfile } from '../services/authService'

const NAV_LINKS = [
  { key: 'dashboard', label: 'Dashboard', icon: '', path: '/' },
  { key: 'holdings', label: 'Holdings', icon: '', path: '/holdings' },
  { key: 'positions', label: 'Positions', icon: '', path: '/positions' },
  { key: 'funds', label: 'Funds', icon: '', path: '/funds' },
]

const INITIAL_NOTIFICATIONS = [
  { id: 1, text: 'RELIANCE order executed at ₹2,847.50', time: '2 min ago', read: false },
  { id: 2, text: 'INFY target price ₹1,800 reached', time: '18 min ago', read: false },
  { id: 3, text: 'Funds ₹10,000 credited to your wallet', time: '1 hr ago', read: true },
]

const PROFILE_MENU = [
  { icon: '👤', label: 'My profile', path: '/profile' },
  { icon: '⚙️', label: 'Settings', path: '/settings' },
  { icon: '🔒', label: 'Security', path: '/security' },
]

export default function Navbar() {
  const navigate = useNavigate()

  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifs, setNotifs] = useState(INITIAL_NOTIFICATIONS)
  const [user, setUser] = useState(null)

  const unreadCount = notifs.filter(n => !n.read).length

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null')

    if (savedUser?.id) {
      getProfile(savedUser.id).then((data) => {
        setUser(data)
      })
    }
  }, [])

  const toggleNotif = () => {
    setNotifOpen(prev => !prev)
    setProfileOpen(false)
  }

  const toggleProfile = () => {
    setProfileOpen(prev => !prev)
    setNotifOpen(false)
  }

  const closeAll = () => {
    setProfileOpen(false)
    setNotifOpen(false)
  }

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    closeAll()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div className="navbar__logo-mark">
          <span className="navbar__logo-letter">Z</span>
        </div>

        <span className="navbar__logo-name">
          Zero<span>dha</span>
        </span>
      </div>

      <div className="navbar__center">
        {NAV_LINKS.map(({ key, label, icon, path }) => (
          <NavLink
            key={key}
            to={path}
            end={path === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeAll}
          >
            <span className="nav-link__icon">{icon}</span>
            {label}
          </NavLink>
        ))}
      </div>

      <div className="navbar__right">
        <div style={{ position: 'relative' }}>
          <button
            className="notif-btn"
            onClick={toggleNotif}
            aria-label="Notifications"
          >
            🔔
            {unreadCount > 0 && (
              <span className="notif-btn__badge">{unreadCount}</span>
            )}
          </button>

          {notifOpen && (
            <div className="notif-panel">
              <div className="notif-panel__header">
                <span className="notif-panel__title">Notifications</span>

                <button
                  className="notif-panel__mark-all"
                  onClick={markAllRead}
                >
                  Mark all read
                </button>
              </div>

              {notifs.map(n => (
                <div key={n.id} className="notif-item">
                  <div
                    className={`notif-item__dot ${
                      n.read
                        ? 'notif-item__dot--read'
                        : 'notif-item__dot--unread'
                    }`}
                  />

                  <div>
                    <div className="notif-item__text">{n.text}</div>
                    <div className="notif-item__time">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="navbar__divider" />

        {user && (
          <div style={{ position: 'relative' }}>
            <button className="profile-btn" onClick={toggleProfile}>
              <div className="profile-btn__avatar">
                {user.fullName?.charAt(0)}
              </div>

              <div>
                <div className="profile-btn__name">{user.fullName}</div>
                <div className="profile-btn__sub">₹{user.walletBalance}</div>
              </div>

              <span className="profile-btn__chevron">▾</span>
            </button>

            {profileOpen && (
              <div className="dropdown">
                <div className="dropdown__header">
                  <div className="dropdown__name">{user.fullName}</div>
                  <div className="dropdown__email">{user.email}</div>
                </div>

                {PROFILE_MENU.map(item => (
                  <div
                    key={item.label}
                    className="dropdown__item"
                    onClick={() => {
                      navigate(item.path)
                      setProfileOpen(false)
                    }}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </div>
                ))}

                <div className="dropdown__separator" />

                <div
                  className="dropdown__item dropdown__item--danger"
                  onClick={handleLogout}
                >
                  <span>🚪</span>
                  Sign out
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}