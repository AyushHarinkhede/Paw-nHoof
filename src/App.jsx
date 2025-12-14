import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [floatingMenuActive, setFloatingMenuActive] = useState(false);
  const [settingsPanelActive, setSettingsPanelActive] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState('login'); // 'login', 'signup', 'profile'
  const [authTab, setAuthTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [locationText, setLocationText] = useState('Detecting Area...');
  const [profileImage, setProfileImage] = useState(null); // ✅ New state for image
  
  const [profileData, setProfileData] = useState({
    name: 'Ayush Harinkhede',
    dob: '',
    mobile: '',
    address: '',
    gender: 'Male'
  });

  useEffect(() => {
    const loginStatus = localStorage.getItem('pawhoof_login');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
      loadProfileData();
    }
    
    // ✅ Load saved profile image
    const savedImage = localStorage.getItem('profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    }
    
    setTimeout(() => {
      setLocationText('📍 Hingna, Nagpur (MH)');
    }, 1500);
  }, []);

  const loadProfileData = () => {
    const saved = {
      name: localStorage.getItem('p_name') || 'Ayush Harinkhede',
      mobile: localStorage.getItem('p_mobile') || '',
      address: localStorage.getItem('p_addr') || '',
      dob: localStorage.getItem('p_dob') || '',
      gender: localStorage.getItem('p_gender') || 'Male'
    };
    setProfileData(saved);
  };

  const toggleFloatingMenu = () => {
    setFloatingMenuActive(!floatingMenuActive);
  };

  const openSettings = () => {
    setSettingsPanelActive(true);
  };

  const closeSettings = () => {
    setSettingsPanelActive(false);
  };

  const setTheme = (theme) => {
    document.body.removeAttribute('data-theme');
    if (theme === 'dark') document.body.setAttribute('data-theme', 'dark');
  };

  const setZoom = (val) => {
    document.body.style.zoom = val + "%";
  };

  const toggleToolsVisibility = (e) => {
    const tools = document.getElementById('floating-tools');
    if (tools) tools.style.display = e.target.checked ? 'flex' : 'none';
  };

  const openAuthModal = (mode) => {
    setAuthModalOpen(true);
    if (isLoggedIn || mode === 'profile') {
      setAuthView('profile');
    } else {
      setAuthView('auth');
      setAuthTab('login');
    }
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const switchAuthTab = (tab) => {
    setAuthTab(tab);
  };

  const simulateLogin = () => {
    localStorage.setItem('pawhoof_login', 'true');
    setIsLoggedIn(true);
    setTimeout(() => {
      setAuthView('profile');
    }, 1000);
  };

  const logout = () => {
    localStorage.removeItem('pawhoof_login');
    localStorage.removeItem('profile_image'); // ✅ Clear image on logout
    setProfileImage(null);
    setIsLoggedIn(false);
    closeAuthModal();
    alert("Logged out successfully");
  };

  const saveProfile = () => {
    localStorage.setItem('p_name', profileData.name);
    localStorage.setItem('p_mobile', profileData.mobile);
    localStorage.setItem('p_addr', profileData.address);
    localStorage.setItem('p_dob', profileData.dob);
    localStorage.setItem('p_gender', profileData.gender);
    if (profileImage) {
      localStorage.setItem('profile_image', profileImage); // ✅ Save image
    }
    alert("Profile Saved!");
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  // ✅ New function for image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfileImage(base64String);
        localStorage.setItem('profile_image', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      {/* Background Animals */}
      <div className="bg-animals">
        <svg className="animal-shadow" style={{top: '30%', left: '5%', width: '150px', height: '150px', animation: 'floatBg 6s infinite ease-in-out'}} viewBox="0 0 24 24"><path d="M4,18 L4,20 C4,21.1 4.9,22 6,22 L18,22 C19.1,22 20,21.1 20,20 L20,18 L4,18 Z M19,9 L19,16 L5,16 L5,9 C5,5.13 8.13,2 12,2 C15.87,2 19,5.13 19,9 Z M10.5,12 C9.67,12 9,11.33 9,10.5 C9,9.67 9.67,9 10.5,9 C11.33,9 12,9.67 12,10.5 C12,11.33 11.33,12 10.5,12 Z M13.5,10.5 C13.5,11.33 14.17,12 15,12 C15.83,12 16.5,11.33 16.5,10.5 C16.5,9.67 15.83,9 15,9 C14.17,9 13.5,9.67 13.5,10.5 Z"/></svg>
        <svg className="animal-shadow" style={{bottom: '25%', right: '10%', width: '200px', height: '200px', animation: 'floatBg 8s infinite ease-in-out'}} viewBox="0 0 24 24"><path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M7,5C8.1,5 9,5.9 9,7C9,8.1 8.1,9 7,9C5.9,9 5,8.1 5,7C5,5.9 5.9,5 7,5M17,5C18.1,5 19,5.9 19,7C19,8.1 18.1,9 17,9C15.9,9 15,8.1 15,7C15,5.9 15.9,5 17,5M12,8C15,8 17,9.5 18,12C18.6,13.5 18.1,17.4 16,19C14.7,20 13.5,19.5 12,19.5C10.5,19.5 9.3,20 8,19C5.9,17.4 5.4,13.5 6,12C7,9.5 9,8 12,8Z"/></svg>
      </div>

      {/* Navbar */}
      <nav>
         <div className="nav-links">
        <div className="logo">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--deep-green)">
            <path d="M12,2C13.1,2 14,2.9 14,4S13.1,6 12,6S10,5.1 10,4S10.9,2 12,2M7,5C8.1,5 9,5.9 9,7S8.1,9 7,9S5,8.1 5,7S5.9,5 7,5M17,5C18.1,5 19,5.9 19,7S18.1,9 17,9S15.9,9 15,7S15.9,5 17,5M12,8C15,8 17,9.5 18,12C18.6,13.5 18.1,17.4 16,19C14.7,20 13.5,19.5 12,19.5C10.5,19.5 9.3,20 8,19C5.9,17.4 5.4,13.5 6,12C7,9.5 9,8 12,8Z"/>
          </svg>
          Paw'nHoof
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#feed">Feed Center</a>
          <a href="#pets">Pets</a>
          <a href="#about">About</a>
        </div></div>
        <div className="auth-btn-container">
          {!isLoggedIn ? (
            <button className="login-btn" onClick={() => openAuthModal('login')}>Sign In</button>
          ) : (
            <div className="user-avatar-nav" onClick={() => openAuthModal('profile')} style={{display: 'flex'}}>
    <img  src={profileImage || `https://ui-avatars.com/api/?name=${profileData.name}&background=5e3fdc&color=fff`}  alt="User" />            </div>
          )}
        </div>
      </nav>

      {/* Floating Tools */}
      <div className="floating-tools-container" id="floating-tools">
        <div className={`floating-menu ${floatingMenuActive ? 'active' : ''}`}>
          <button className="float-btn" onClick={() => window.scrollTo(0,0)} title="Scroll Top">⬆</button>
          <button className="float-btn" onClick={() => window.history.back()} title="Go Back">⬅</button>
          <button className="float-btn" onClick={openSettings} title="Settings">⚙</button>
        </div>
        <button className={`float-btn main-toggle ${floatingMenuActive ? 'active' : ''}`} onClick={toggleFloatingMenu}>+</button>
      </div>

      {/* Settings Panel */}
      <div className={`settings-overlay ${settingsPanelActive ? 'active' : ''}`} onClick={closeSettings}></div>
      <div className={`settings-panel ${settingsPanelActive ? 'active' : ''}`}>
        <div className="settings-header">
          <h3>⚙ Settings</h3>
          <span onClick={closeSettings} style={{cursor: 'pointer', fontSize: '1.5rem'}}>&times;</span>
        </div>

        <div className="settings-group">
          <h4>Theme</h4>
          <div className="theme-options">
            <button className="theme-btn" onClick={() => setTheme('light')}>☀ Light</button>
            <button className="theme-btn" onClick={() => setTheme('dark')}>🌙 Dark</button>
            <button className="theme-btn" onClick={() => setTheme('pastel')}>🎨 Pastel</button>
          </div>
        </div>

        <div className="settings-group">
          <h4>Zoom Level</h4>
          <input type="range" min="80" max="120" defaultValue="100" onInput={(e) => setZoom(e.target.value)} style={{width: '100%'}} />
        </div>

        <div className="settings-group">
          <div className="toggle-row">
            <span>Show Floating Tools</span>
            <label className="switch">
              <input type="checkbox" defaultChecked onChange={toggleToolsVisibility} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-group">
          <div className="toggle-row">
            <span>Notifications</span>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {authModalOpen && (
        <div className="modal-wrapper" style={{display: 'flex'}}>
          <div className="auth-card">
            <span className="close-modal" onClick={closeAuthModal}>&times;</span>

            {authView === 'auth' ? (
              <div>
                <div className="auth-tabs">
                  <button className={`tab-btn ${authTab === 'login' ? 'active' : ''}`} onClick={() => switchAuthTab('login')}>Login</button>
                  <button className={`tab-btn ${authTab === 'signup' ? 'active' : ''}`} onClick={() => switchAuthTab('signup')}>Sign Up</button>
                </div>

                {authTab === 'login' ? (
                  <div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" placeholder="user@example.com" />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" placeholder="••••••" />
                    </div>
                    <button className="login-btn" style={{width: '100%'}} onClick={simulateLogin}>Login</button>
                  </div>
                ) : (
                  <div>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" placeholder="Ayush Harinkhede" />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" placeholder="user@example.com" />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" placeholder="Create Password" />
                    </div>
                    <button className="login-btn" style={{width: '100%'}} onClick={simulateLogin}>Create Account</button>
                  </div>
                )}

                <div className="social-login">
                  <button className="social-btn">🔵 Facebook</button>
                  <button className="social-btn">🔴 Google</button>
                  <button className="social-btn">⚫ Apple</button>
                  <button className="social-btn">🟦 Microsoft</button>
                </div>
              </div>
            ) : (
              <div>
                
         
<div className="profile-header">
  <div className="profile-pic-upload">
    <img 
      src={profileImage || `https://ui-avatars.com/api/?name=${profileData.name}&background=5e3fdc&color=fff`} 
      alt="Profile" 
    />
    <input 
      type="file" 
      id="profile-pic-input" 
      accept="image/*" 
      onChange={handleImageUpload}
      style={{display: 'none'}}
    />
    <label 
      htmlFor="profile-pic-input" 
      className="edit-icon" 
      style={{cursor: 'pointer'}}
    >
      📷
    </label>
  </div>
  
  <h3>{profileData.name}</h3>
  
  {/* ✅ Upload Button */}
  <label 
    htmlFor="profile-pic-input" 
    className="upload-image-btn"
    style={{
      display: 'inline-block',
      marginTop: '10px',
      padding: '8px 20px',
      background: 'var(--primary)',
      color: 'white',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      transition: '0.3s'
    }}
    onMouseEnter={(e) => e.target.style.background = 'var(--accent)'}
    onMouseLeave={(e) => e.target.style.background = 'var(--primary)'}
  >
    📤 Upload Image
  </label>
</div>

                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={profileData.name} onChange={(e) => handleProfileChange('name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>DOB</label>
                  <input type="date" value={profileData.dob} onChange={(e) => handleProfileChange('dob', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Mobile</label>
                  <input type="tel" value={profileData.mobile} placeholder="+91 0000000000" onChange={(e) => handleProfileChange('mobile', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea value={profileData.address} rows="2" placeholder="Nagpur, MH" onChange={(e) => handleProfileChange('address', e.target.value)}></textarea>
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select value={profileData.gender} onChange={(e) => handleProfileChange('gender', e.target.value)}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <button className="login-btn" style={{width: '100%', marginBottom: '10px'}} onClick={saveProfile}>Save Changes</button>
                <button className="logout-btn" onClick={logout}>Log Out</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-text">
          <h1>Save a Paw,<br/>Feed a Hoof</h1>
          <p>Every wag and every hoofbeat tells a story. Join our mission to adopt, feed, and love the strays.</p>
          <button className="account-btn" style={{padding: '15px 40px', fontSize: '1.2rem'}}>Start Donating</button>
        </div>
        <div className="hero-visual">
          <div className="blob">
            <div style={{fontSize: '8rem'}}>🐶🐱🐮🐷</div>
          </div>
        </div>
      </section>

      {/* Feed Section */}
      <section className="section-container" id="feed">
        <h2 className="section-title">Feed Centers & Map</h2>
        <div className="feed-layout">
          <div className="map-wrapper">
            <div className="map-container">
              <iframe 
                src="https://www.openstreetmap.org/export/embed.html?bbox=78.9400%2C21.0600%2C79.0200%2C21.1300&layer=mapnik&marker=21.0968%2C78.9814" 
                style={{border: 0}} 
                allowFullScreen 
                loading="lazy"
              />
            </div>
            <div className="location-bar">
              <div className="live-indicator">
                <span className="pulse-dot"></span> Live
              </div>
              <span className="location-text">{locationText}</span>
            </div>
          </div>
          <div className="feed-info">
            <h3>Locate Hungry Souls</h3>
            <p style={{fontSize: '1.2rem', lineHeight: 1.6}}>
              Use our symmetrical map interface to find feeding centers near <strong>Nagpur</strong>. Donate food or visit personally to feed cows, dogs, and goats.
            </p>
            <br/>
            <button className="btn-adopt">View Locations</button>
          </div>
        </div>
      </section>

      {/* Pets Section */}
      <div className="pets-section" id="pets">
        <h2 className="section-title">Adopt a Friend</h2>

        <div className="category-title">
          <span>🐾</span> THE PAWS <span>(Dog, Cat, Bear, Squirrel)</span>
        </div>
        <div className="pet-grid">
          {[
            {name: 'Sheru', breed: 'Indian Pariah | Male', location: 'Hingna Road', emoji: '🐕', bg: 'var(--pastel-blue)'},
            {name: 'Mimi', breed: 'Persian Mix | Female', location: 'Sadar', emoji: '🐈', bg: 'var(--pastel-pink)'},
            {name: 'Chiku', breed: 'Squirrel | Rescue', location: 'Seminary Hills', emoji: '🐿️', bg: 'var(--pastel-green)'}
            
          ].map((pet, i) => (
            <div key={i} className="pet-card">
              <div className="pet-img-box" style={{background: pet.bg}}>
                <div className="css-icon">{pet.emoji}</div>
              </div>
              <div className="pet-details">
                <div className="pet-name">{pet.name}</div>
                <div className="pet-breed">{pet.breed}</div>
                <div className="location-tag">📍 {pet.location}</div>
                <div className="card-actions">
                  <button className="btn-adopt">Adopt Me</button>
                  <div className="btn-heart">♥</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="category-title" style={{marginTop: '60px'}}>
          <span>🐄</span> THE HOOVES <span>(Cow, Goat, Horse, Deer)</span>
        </div>
        <div className="pet-grid">
          {[
            {name: 'Gauri', breed: 'Desi Cow | Female', location: 'Dharampeth', emoji: '🐄', bg: 'var(--pastel-yellow)', btn: 'Donate Fodder'},
            {name: 'Balu', breed: 'Goat | Male', location: 'Itwari', emoji: '🐐', bg: 'var(--pastel-purple)', btn: 'Adopt Me'},
            {name: 'Badal', breed: 'Pony | Male', location: 'Futala', emoji: '🐎', bg: 'var(--pastel-blue)', btn: 'Medical Aid'}
          ].map((pet, i) => (
            <div key={i} className="pet-card">
              <div className="pet-img-box" style={{background: pet.bg}}>
                <div className="css-icon">{pet.emoji}</div>
              </div>
              <div className="pet-details">
                <div className="pet-name">{pet.name}</div>
                <div className="pet-breed">{pet.breed}</div>
                <div className="location-tag">📍 {pet.location}</div>
                <div className="card-actions">
                  <button className="btn-adopt">{pet.btn}</button>
                  <div className="btn-heart">♥</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="footer-wrapper">
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
        </div>

        <footer>
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-brand-box">
                <h2 className="footer-brand-text">Paw'nHoof..</h2>
              </div>
              <div className="social-icons">
                <i className="fab fa-instagram"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-youtube"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-github"></i>
              </div>
            </div>

            <div className="footer-links-container">
              <div className="footer-col">
                <h4>Support</h4>
                <ul className="footer-links">
                  <li><i className="fas fa-user-plus"></i> My Account</li>
                  <li><i className="fas fa-box-open"></i> Donate Now</li>
                  <li><i className="fas fa-envelope"></i> Feed Now</li>
                  <li><i className="fas fa-phone-alt"></i> Contact: 9209514158</li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Quick Links</h4>
                <ul className="footer-links">
                  <li><i className="fas fa-chevron-left" style={{fontSize: '0.7rem'}}></i> Privacy Policy</li>
                  <li><i className="fas fa-chevron-left" style={{fontSize: '0.7rem'}}></i> Terms & Conditions</li>
                  <li><i className="fas fa-chevron-left" style={{fontSize: '0.7rem'}}></i> Rights & Reserves</li>
                  <li><i className="fas fa-chevron-left" style={{fontSize: '0.7rem'}}></i> Accessibility Statement</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p><b><i>Empowering lives through technology and support since 2025.</i></b></p>
            <p className="highlight-text"><b><i>Designed with ❤️ for the community</i></b>.</p>
            <p><b>I think You should know about that<br/><i>It's a prompt Website and that's why it's not provide any type of real service or help...</i></b></p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;