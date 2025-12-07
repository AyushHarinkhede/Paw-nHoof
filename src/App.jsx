import React, { useState, useEffect } from 'react';
import './App.css';

// --- Components ---

const Navbar = ({ view, setView, cartCount }) => (
  <nav className="navbar">
    <div className="container flex-between">
      <div className="logo" onClick={() => setView('home')}>
        <span className="material-icons-round">pets</span> Pawhoof
      </div>
      
      <div className="nav-links">
        {['Home', 'Feed', 'Pets', 'About'].map(item => (
          <div 
            key={item}
            className={`nav-item ${view === item.toLowerCase() ? 'active' : ''}`}
            onClick={() => setView(item.toLowerCase())}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="nav-actions">
        <div className="btn-icon" onClick={() => alert('Favorites List')}>
          <span className="material-icons-round" style={{color: cartCount > 0 ? '#FF6B6B' : '#ccc'}}>favorite</span>
        </div>
        <div className="btn-icon" onClick={() => setView('account')}>
          <span className="material-icons-round">person</span>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ setView }) => (
  <section className="hero">
    <div className="container grid-cols-2">
      <div style={{alignSelf: 'center'}}>
        <span className="hero-tag">🚀 Saving Lives Since 2025</span>
        <h1>Make a difference in a Stray's life.</h1>
        <p>Donate food, adopt a friend, or help a local shelter. We bridge the gap between kindness and need.</p>
        <div style={{display: 'flex', gap: '16px'}}>
          <button className="btn-primary" onClick={() => setView('pets')}>Find a Friend</button>
          <button className="btn-secondary" onClick={() => setView('feed')}>Donate Food</button>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="abstract-blob blob-1"></div>
        <div className="abstract-blob blob-2"></div>
        <div className="hero-card float-anim">
          <span style={{fontSize: '60px'}}>🐕</span>
          <h3>Sheru needs a home.</h3>
          <p style={{fontSize: '14px', margin: '10px 0'}}>Civil Lines Area • 2km away</p>
          <button className="btn-primary" style={{padding: '8px', fontSize: '14px'}}>Meet Sheru</button>
        </div>
      </div>
    </div>
  </section>
); 

const Pets = ({ likedPets, toggleLike }) => {
  const [filter, setFilter] = useState('Paw'); // Paw or Hoof
  
  const petsData = [
    { id: 1, type: 'Paw', name: 'Bruno', breed: 'Labrador Mix', loc: 'Sadar', img: '🐕' },
    { id: 2, type: 'Paw', name: 'Kitty', breed: 'Persian', loc: 'Mankapur', img: '🐈' },
    { id: 3, type: 'Hoof', name: 'Lali', breed: 'Gir Cow', loc: 'Temple Rd', img: '🐄' },
    { id: 4, type: 'Paw', name: 'Rocky', breed: 'Indie', loc: 'Sitabuldi', img: '🐕‍🦺' },
    { id: 5, type: 'Hoof', name: 'Moti', breed: 'Goat', loc: 'Village', img: '🐐' },
    { id: 6, type: 'Hoof', name: 'Chetak', breed: 'Horse', loc: 'Farm', img: '🐎' },
  ];

  return (
    <section className="container" style={{paddingTop: '120px'}}>
      <div className="section-title">
        <h2>Adopt, Don't Shop</h2>
        <p>Browse pets waiting for a loving family near you.</p>
      </div>

      <div className="flex-center">
        <div className="filter-tabs">
          <div className={`tab ${filter === 'Paw' ? 'active' : ''}`} onClick={() => setFilter('Paw')}>
            🐾 PAWS (Dogs/Cats)
          </div>
          <div className={`tab ${filter === 'Hoof' ? 'active' : ''}`} onClick={() => setFilter('Hoof')}>
            🐮 HOOFS (Cows/Goats)
          </div>
        </div>
      </div>

      <div className="pets-grid">
        {petsData.filter(p => p.type === filter).map(pet => (
          <div key={pet.id} className="pet-card">
            <div className="pet-image-area">
              {pet.img}
              <button 
                className={`like-btn ${likedPets.includes(pet.id) ? 'liked' : ''}`}
                onClick={() => toggleLike(pet.id)}
              >
                <span className="material-icons-round">favorite</span>
              </button>
            </div>
            <div className="pet-info">
              <div className="flex-between">
                <h3>{pet.name}</h3>
                <span className="chip">2km</span>
              </div>
              <span className="pet-breed">{pet.breed} • {pet.loc}</span>
              
              <div className="action-row">
                <button className="btn-secondary">Upload 📷</button>
                <button className="btn-primary">Adopt</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Feed = () => (
  <section className="container" style={{paddingTop: '120px', paddingBottom: '80px'}}>
    <div className="section-title">
      <h2>Feeding Centers</h2>
      <p>Select a location on the map to send a food donation.</p>
    </div>

    <div className="feed-layout">
      <div className="map-card">
        <div className="map-bg"></div>
        {/* Pins */}
        <div className="map-pin" style={{top: '40%', left: '30%'}}>
          <div className="pin-label">Nagpur Shelter</div>
          <div className="pin-dot"></div>
        </div>
        <div className="map-pin" style={{top: '60%', left: '70%'}}>
          <div className="pin-label">Gorewada Zoo</div>
          <div className="pin-dot"></div>
        </div>
      </div>

      <div className="donation-card">
        <h3>Donate Food 🍞</h3>
        <p style={{color: '#636E72', marginBottom: '24px'}}>Your donation goes directly to registered feeders.</p>
        
        <div className="input-group">
          <label>Select Amount</label>
          <div style={{display: 'flex', gap: '8px', marginBottom: '16px'}}>
            <button className="btn-secondary" style={{padding: '10px'}}>₹50</button>
            <button className="btn-primary" style={{padding: '10px'}}>₹100</button>
            <button className="btn-secondary" style={{padding: '10px'}}>₹500</button>
          </div>
        </div>

        <div className="input-group">
          <label>Your Name</label>
          <input type="text" className="modern-input" placeholder="Enter name" />
        </div>
        
        <button className="btn-primary" style={{width: '100%'}}>Proceed to Pay</button>
      </div>
    </div>
  </section>
);

const Account = () => (
  <section className="container" style={{paddingTop: '120px', minHeight: '80vh'}}>
    <div className="account-box">
      <div style={{width: '80px', height: '80px', background: '#FF6B6B', borderRadius: '50%', margin: '0 auto 24px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
        <span className="material-icons-round" style={{fontSize: '40px'}}>person</span>
      </div>
      <h2>Welcome Back!</h2>
      <p style={{color: '#636E72', marginBottom: '32px'}}>Manage your adoptions and donations.</p>
      
      <div className="input-group" style={{textAlign: 'left'}}>
        <label>Email Address</label>
        <input type="email" className="modern-input" placeholder="name@example.com" />
      </div>
      <div className="input-group" style={{textAlign: 'left'}}>
        <label>Password</label>
        <input type="password" className="modern-input" placeholder="••••••••" />
      </div>
      
      <button className="btn-primary" style={{width: '100%'}}>Sign In</button>
      <p style={{marginTop: '16px', fontSize: '14px', color: '#636E72', cursor: 'pointer'}}>Don't have an account? Sign up</p>
    </div>
  </section>
);

// --- Main App ---

function App() {
  const [view, setView] = useState('home');
  const [likedPets, setLikedPets] = useState([]);

  const toggleLike = (id) => {
    if (likedPets.includes(id)) {
      setLikedPets(likedPets.filter(pid => pid !== id));
    } else {
      setLikedPets([...likedPets, id]);
    }
  };

  // Smooth scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  return (
    <div className="app">
      <Navbar view={view} setView={setView} cartCount={likedPets.length} />
      
      {view === 'home' && <Hero setView={setView} />}
      {view === 'pets' && <Pets likedPets={likedPets} toggleLike={toggleLike} />}
      {view === 'feed' && <Feed />}
      {view === 'account' && <Account />}
      {view === 'about' && (
        <section className="container" style={{paddingTop: '140px', textAlign: 'center'}}>
          <h1>About Pawhoof</h1>
          <p style={{maxWidth: '600px', margin: '20px auto', lineHeight: '1.6'}}>
            We are a team of animal lovers dedicated to using technology to help strays find homes.
          </p>
        </section>
      )}

      {/* Floating Controls */}
      <div className="floating-controls">
        <div className="btn-icon" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className="material-icons-round">arrow_upward</span>
        </div>
      </div>
    </div>
  );
}

export default App;


