import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import MenuManagement from './components/MenuManagement/MenuManagement';
import OrdersDashboard from './components/OrdersDashboard/OrdersDashboard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div className="app">
      <Navbar />
      
      <div className="tabs-container">
        <div className="container">
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
              onClick={() => setActiveTab('menu')}
            >
              🍽️ Menu Management
            </button>
            <button
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📋 Orders Dashboard
            </button>
          </div>
        </div>
      </div>

      <main className="main-content">
        {activeTab === 'menu' ? <MenuManagement /> : <OrdersDashboard />}
      </main>

      <footer className="footer">
        <div className="container">
          <p className="text-center text-sm text-muted">
            © 2026 Eatoes Restaurant Dashboard • Built for Technical Assessment
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

