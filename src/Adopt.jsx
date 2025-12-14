import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // --- States for UI ---
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [user, setUser] = useState(null);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showTools, setShowTools] = useState(true);

  // --- Profile States ---
  const [profileName, setProfileName] = useState('Ayush Harinkhede');
  const [profileMobile, setProfileMobile] = useState('');
  const [profileAddr, setProfileAddr] = useState('');

  // --- Effects (Load Data on Start) ---
  useEffect(() => {
    const loggedIn = localStorage.getItem('pawhoof_login');
    if (loggedIn === 'true') {
      setUser({ name: localStorage.getItem('p_name') || 'Ayush' });
    }
    const savedName = localStorage.getItem('p_name');
    if (savedName) setProfileName(savedName);
  }, []);

  // --- Handlers ---
  const handleLogin = () => {
    localStorage.setItem('pawhoof_login', 'true');
    setUser({ name: profileName });
    setAuthOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('pawhoof_login');
    setUser(null);
    setAuthOpen(false);
  };

  const handleSaveProfile = () => {
    localStorage.setItem('p_name', profileName);
    localStorage.setItem('p_mobile', profileMobile);
    localStorage.setItem('p_addr', profileAddr);
    setUser({ name: profileName });
    alert("Profile Saved!");
  };

  const setTheme = (theme) => {
    document.body.removeAttribute('data-theme');
    if (theme === 'dark') document.body.setAttribute('data-theme', 'dark');
  };

  return (
    <div className="App">
      {/* --- BACKGROUND ANIMALS (SVGs) --- */}
      <div className="bg-animals">
        <svg className="animal-shadow" style={{ top: '30%', left: '5%', width: '150px', animation: 'floatBg 6s infinite ease-in-out' }} viewBox="0 0 24 24"><path d="M4,18 L4,20 C4,21.1 4.9,22 6,22 L18,22 C19.1,22 20,21.1 20,20 L20,18 L4,18 Z M19,9 L19,16 L5,16 L5,9 C5,5.13 8.13,2 12,2 C15.87,2 19,5.13 19,9 Z M10.5,12 C9.67,12 9,11.33 9,10.5 C9,9.67 9.67,9 10.5,9 C11.33,9 12,9.67 12,10.5 C12,11.33 11.33,12 10.5,12 Z M13.5,10.5 C13.5,11.33 14.17,12 15,12 C15.83,12 16.5,11.33 16.5,10.5 C16.5,9.67 15.83,9 15,9 C14.17,9 13.5,9.67 13.5,10.5 Z"/></svg>
        <svg className="animal-shadow" style={{ bottom: '25%', right: '10%', width: '200px', animation: 'floatBg 8s infinite ease-in-out' }} viewBox="0 0 24 24"><path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M7,5C8.1,5 9,5.9 9,7C9,8.1 8.1,9 7,9C5.9,9 5,8.1 5,7C5,5.9 5.9,5 7,5M17,5C18.1,5 19,5.9 19,7C19,8.1 18.1,9 17,9C15.9,9 15,8.1 15,7C15,5.9 15.9,5 17,5M12,8C15,8 17,9.5 18,12C18.6,13.5 18.1,17.4 16,19C14.7,20 13.5,19.5 12,19.5C10.5,19.5 9.3,20 8,19C5.9,17.4 5.4,13.5 6,12C7,9.5 9,8 12,8Z"/></svg>
      </div>

      {/* --- NAVBAR --- */}
      <nav>
        <div className="logo">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--deep-green)"><path d="M12,2C13.1,2 14,2.9 14,4S13.1,6 12,6S10,5.1 10,4S10.9,2 12,2M7,5C8.1,5 9,5.9 9,7S8.1,9 7,9S5,8.1 5,7S5.9,5 7,5M17,5C18.1,5 19,5.9 19,7S18.1,9 17,9S15.9,9 15,7S15.9,5 17,5M12,8C15,8 17,9.5 18,12C18.6,13.5 18.1,17.4 16,19C14.7,20 13.5,19.5 12,19.5C10.5,19.5 9.3,20 8,19C5.9,17.4 5.4,13.5 6,12C7,9.5 9,8 12,8Z"/></svg>
          Paw'nHoof
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#feed">Feed Center</a>
          <a href="#pets">Pets</a>
          <a href="#about">About</a>
        </div>
      
        <div className="nav-actions">
          {user ? (
            <>
              <button onClick={() => setSettingsOpen(true)} title="Settings">
                <i className="fas fa-cog"></i>
              </button>
              <button onClick={handleLogout} title="Logout">
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </>
          ) : (
            <button onClick={() => { setAuthMode('login'); setAuthOpen(true); }} title="Login / Sign Up">
              <i className="fas fa-user"></i>
            </button>
          )}
          <button onClick={() => setMenuOpen(!isMenuOpen)} className="menu-btn" title="Menu">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>
    
      </div>
  );
}

export default App






