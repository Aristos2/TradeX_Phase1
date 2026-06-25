import React, { useState } from 'react'
import './Sidebar.css'

// Dummy data to simulate a stock market watchlist
const WATCHLIST_DATA = [
  { id: 1, symbol: 'NIFTY 50', price: '22,514.65', change: '0.45', isUp: true },
  { id: 2, symbol: 'SENSEX',   price: '74,227.63', change: '-0.50', isUp: false },
//   { id: 3, symbol: 'RELIANCE', price: '2,952.15',  change: '-1.20', isUp: false },
//   { id: 4, symbol: 'TCS',      price: '3,980.00',  change: '0.85', isUp: true },
//   { id: 5, symbol: 'INFY',     price: '1,485.30',  change: '-0.30', isUp: false },
//   { id: 6, symbol: 'HDFC BANK',price: '1,520.40',  change: '1.10', isUp: true },
]

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter stocks based on search input
  const filteredStocks = WATCHLIST_DATA.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="sidebar">
      
      {/* ── Search Bar ── */}
      <div className="sidebar__search-container">
        <span className="sidebar__search-icon"></span>
        <input
          type="text"
          className="sidebar__search-input"
          placeholder="Search eg: infy bse, nifty fut"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="sidebar__search-count">{WATCHLIST_DATA.length}/50</span>
      </div>

      {/* ── Watchlist Items ── */}
      <div className="sidebar__list">
        {filteredStocks.map((item) => (
          <div key={item.id} className="sidebar__item">
            <div className="sidebar__item-symbol">{item.symbol}</div>
            
            <div className="sidebar__item-data">
              <span className={`sidebar__item-change ${item.isUp ? 'text-green' : 'text-red'}`}>
                {item.change}%
              </span>
              <span className={`sidebar__item-price ${item.isUp ? 'text-green' : 'text-red'}`}>
                <span className="sidebar__item-arrow">{item.isUp ? '▲' : '▼'}</span> 
                {item.price}
              </span>
            </div>
          </div>
        ))}
        {filteredStocks.length === 0 && (
          <div className="sidebar__empty">No instruments found</div>
        )}
      </div>

      {/* ── Bottom Tabs (Watchlists 1 to 5) ── */}
      <div className="sidebar__tabs">
        {[1, 2, 3, 4, 5].map((tab) => (
          <button
            key={tab}
            className={`sidebar__tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <button className="sidebar__tab-settings" aria-label="Settings">⚙️</button>
      </div>

    </div>
  )
}

export default Sidebar