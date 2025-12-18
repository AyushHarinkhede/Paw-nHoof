import React, { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [floatingMenuActive, setFloatingMenuActive] = useState(false);
  const [settingsPanelActive, setSettingsPanelActive] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState('profile'); // 'login', 'signup', 'profile', 'edit'
  const [authTab, setAuthTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [locationText, setLocationText] = useState('Detecting Area...');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedAnimals, setLikedAnimals] = useState([]);
  const [adoptedAnimals, setAdoptedAnimals] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [nearbyOnly, setNearbyOnly] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('light');
  
  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  
  const [profileData, setProfileData] = useState({
    name: 'Ayush Harinkhede',
    dob: '',
    mobile: '',
    address: '',
    gender: 'Male',
    email: ''
  });

  // Generate 25 animals with real image URLs (cut-out style images)
  const generateAnimals = () => {
    const animals = [
      // Dogs
      { id: 1, name: 'Sheru', breed: 'Indian Pariah', gender: 'Male', age: '3 years', location: 'Hingna Road', type: 'dog', needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.0968, lng: 78.9814 },
      { id: 2, name: 'Rex', breed: 'Labrador', gender: 'Male', age: '2 years', location: 'Sadar', type: 'dog', needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.1456, lng: 79.0882 },
      { id: 3, name: 'Luna', breed: 'Golden Retriever', gender: 'Female', age: '4 years', location: 'Dharampeth', type: 'dog', needsRescue: false, needsMedical: true, needsDonate: false, lat: 21.1523, lng: 79.0801 },
      { id: 4, name: 'Max', breed: 'German Shepherd', gender: 'Male', age: '5 years', location: 'Seminary Hills', type: 'dog', needsRescue: true, needsMedical: false, needsDonate: true, lat: 21.1389, lng: 79.0654 },
      { id: 5, name: 'Bella', breed: 'Beagle', gender: 'Female', age: '1 year', location: 'Itwari', type: 'dog', needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.1623, lng: 79.0923 },
      
      // Cats
      { id: 6, name: 'Mimi', breed: 'Persian Mix', gender: 'Female', age: '2 years', location: 'Sadar', type: 'cat', needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.1456, lng: 79.0882 },
      { id: 7, name: 'Whiskers', breed: 'Siamese', gender: 'Male', age: '3 years', location: 'Futala', type: 'cat', needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.1289, lng: 79.0456 },
      { id: 8, name: 'Shadow', breed: 'Maine Coon', gender: 'Male', age: '4 years', location: 'Dharampeth', type: 'cat', needsRescue: false, needsMedical: true, needsDonate: false, lat: 21.1523, lng: 79.0801 },
      { id: 9, name: 'Lily', breed: 'British Shorthair', gender: 'Female', age: '1 year', location: 'Hingna Road', type: 'cat', needsRescue: false, needsMedical: false, needsDonate: true, lat: 21.0968, lng: 78.9814 },
      
      // Squirrels
      { id: 10, name: 'Chiku', breed: 'Indian Palm Squirrel', gender: 'Male', age: '6 months', location: 'Seminary Hills', type: 'squirrel', needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.1389, lng: 79.0654 },
      { id: 11, name: 'Nibbles', breed: 'Three-striped Squirrel', gender: 'Female', age: '8 months', location: 'Futala', type: 'squirrel', needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.1289, lng: 79.0456 },
      
      // Goats
      { id: 12, name: 'Balu', breed: 'Desi Goat', gender: 'Male', age: '2 years', location: 'Itwari', type: 'goat', needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.1623, lng: 79.0923 },
      { id: 13, name: 'Chhaya', breed: 'Jamnapari', gender: 'Female', age: '3 years', location: 'Hingna Road', type: 'goat', needsRescue: false, needsMedical: true, needsDonate: true, lat: 21.0968, lng: 78.9814 },
      { id: 14, name: 'Ramu', breed: 'Barbari', gender: 'Male', age: '1 year', location: 'Sadar', type: 'goat', needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.1456, lng: 79.0882 },
      
      // Horses
      { id: 15, name: 'Badal', breed: 'Pony', gender: 'Male', age: '5 years', location: 'Futala', type: 'horse', needsRescue: false, needsMedical: true, needsDonate: false, lat: 21.1289, lng: 79.0456 },
      { id: 16, name: 'Storm', breed: 'Marwari', gender: 'Male', age: '7 years', location: 'Dharampeth', type: 'horse', needsRescue: false, needsMedical: false, needsDonate: true, lat: 21.1523, lng: 79.0801 },
      { id: 17, name: 'Princess', breed: 'Arabian', gender: 'Female', age: '4 years', location: 'Seminary Hills', type: 'horse', needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.1389, lng: 79.0654 },
      
      // Cows
      { id: 18, name: 'Gauri', breed: 'Desi Cow', gender: 'Female', age: '6 years', location: 'Dharampeth', type: 'cow', needsRescue: false, needsMedical: false, needsDonate: true, lat: 21.1523, lng: 79.0801 },
      { id: 19, name: 'Kamdhenu', breed: 'Gir', gender: 'Female', age: '8 years', location: 'Hingna Road', type: 'cow', needsRescue: false, needsMedical: true, needsDonate: false, lat: 21.0968, lng: 78.9814 },
      { id: 20, name: 'Lakshmi', breed: 'Sahiwal', gender: 'Female', age: '5 years', location: 'Itwari', type: 'cow', needsRescue: true, needsMedical: false, needsDonate: true, lat: 21.1623, lng: 79.0923 },
      
      // Buffalo
      { id: 21, name: 'Mahadev', breed: 'Murrah', gender: 'Male', age: '4 years', location: 'Sadar', type: 'buffalo', needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.1456, lng: 79.0882 },
      { id: 22, name: 'Shakti', breed: 'Nili-Ravi', gender: 'Female', age: '6 years', location: 'Futala', type: 'buffalo', needsRescue: false, needsMedical: true, needsDonate: true, lat: 21.1289, lng: 79.0456 },
      
      // Ox
      { id: 23, name: 'Bhim', breed: 'Ongole', gender: 'Male', age: '7 years', location: 'Dharampeth', type: 'ox', needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.1523, lng: 79.0801 },
      { id: 24, name: 'Balram', breed: 'Gir', gender: 'Male', age: '9 years', location: 'Seminary Hills', type: 'ox', needsRescue: true, needsMedical: true, needsDonate: false, lat: 21.1389, lng: 79.0654 },
      
      // Camel
      { id: 25, name: 'Sahara', breed: 'Bikaneri', gender: 'Male', age: '10 years', location: 'Hingna Road', type: 'camel', needsRescue: false, needsMedical: false, needsDonate: true, lat: 21.0968, lng: 78.9814 },

      // Desi Dogs
      { id: 26, name: 'Kalu', breed: 'Desi Dog', gender: 'Male', age: '2 years', location: 'Manewada', type: 'dog', needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.0968, lng: 79.0290 },
      { id: 27, name: 'Gudiya', breed: 'Desi Dog', gender: 'Female', age: '1.5 years', location: 'Bardi', type: 'dog', needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.1650, lng: 79.0600 },

      // Desi Cats
      { id: 28, name: 'Chutki', breed: 'Desi Cat', gender: 'Female', age: '1 year', location: 'Jaripatka', type: 'cat', needsRescue: false, needsMedical: false, needsDonate: true, lat: 21.1800, lng: 79.0800 },
      { id: 29, name: 'Motu', breed: 'Desi Cat', gender: 'Male', age: '3 years', location: 'Dharampeth', type: 'cat', needsRescue: true, needsMedical: true, needsDonate: false, lat: 21.1523, lng: 79.0801 },

      // Desi Cows & Buffalo/Sheep
      { id: 30, name: 'Nandini', breed: 'Desi Cow', gender: 'Female', age: '7 years', location: 'Mhalgi Nagar', type: 'cow', needsRescue: false, needsMedical: true, needsDonate: true, lat: 21.1000, lng: 79.0800 },
      { id: 31, name: 'Bhola', breed: 'Desi Bull', gender: 'Male', age: '6 years', location: 'Hudkeshwar', type: 'ox', needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.0700, lng: 79.1000 },

      // Pigs
      { id: 32, name: 'Gulabo', breed: 'Desi Pig', gender: 'Female', age: '2 years', location: 'Mankapur', type: 'pig', needsRescue: false, needsMedical: false, needsDonate: true, lat: 21.1900, lng: 79.1000 },
      { id: 33, name: 'Lallu', breed: 'Desi Pig', gender: 'Male', age: '3 years', location: 'Sadar', type: 'pig', needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.1456, lng: 79.0882 },

      // Sheep
      { id: 34, name: 'Dholu', breed: 'Desi Sheep', gender: 'Male', age: '2 years', location: 'Futala', type: 'sheep', needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.1289, lng: 79.0456 },
      { id: 35, name: 'Bhuri', breed: 'Desi Sheep', gender: 'Female', age: '1.5 years', location: 'Itwari', type: 'sheep', needsRescue: true, needsMedical: false, needsDonate: true, lat: 21.1623, lng: 79.0923 }
    ];
    
    // Add image URLs (using placeholder service that provides cut-out style images)
    return animals.map(animal => ({
      ...animal,
      image: `https://source.unsplash.com/400x400/?${animal.type}+animal&sig=${animal.id}`
    }));
  };

  const [animals] = useState(generateAnimals());

  const loadProfileData = () => {
    const saved = {
      name: localStorage.getItem('p_name') || 'Ayush Harinkhede',
      mobile: localStorage.getItem('p_mobile') || '',
      address: localStorage.getItem('p_addr') || '',
      dob: localStorage.getItem('p_dob') || '',
      gender: localStorage.getItem('p_gender') || 'Male',
      email: localStorage.getItem('p_email') || ''
    };
    setProfileData(saved);
  };

  useEffect(() => {
    const loginStatus = localStorage.getItem('pawhoof_login');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
      loadProfileData();
      setAuthView('profile');
    }
    
    const savedImage = localStorage.getItem('profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    }
    
    const savedLikes = localStorage.getItem('liked_animals');
    if (savedLikes) {
      setLikedAnimals(JSON.parse(savedLikes));
    }
    
    const savedAdopted = localStorage.getItem('adopted_animals');
    if (savedAdopted) {
      setAdoptedAnimals(JSON.parse(savedAdopted));
    }

    const savedTheme = localStorage.getItem('pawhoof_theme') || 'light';
    setTheme(savedTheme);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLocationText(`Your area (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`);
        },
        () => {
          setLocationText('Hingna, Nagpur (MH)');
        }
      );
    } else {
      setLocationText('Hingna, Nagpur (MH)');
    }
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return '';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleLogin = () => {
    const errors = {};
    if (!loginForm.email || !validateEmail(loginForm.email)) {
      errors.email = 'Please enter a valid Gmail address';
    }
    if (!loginForm.password || !validatePassword(loginForm.password)) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});
    if (rememberMe) {
      localStorage.setItem('remembered_email', loginForm.email);
    }
    simulateLogin();
  };

  const handleSignup = () => {
    const errors = {};
    if (!signupForm.name || signupForm.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    if (!signupForm.email || !validateEmail(signupForm.email)) {
      errors.email = 'Please enter a valid Gmail address';
    }
    if (!signupForm.password || !validatePassword(signupForm.password)) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});
    localStorage.setItem('p_name', signupForm.name);
    localStorage.setItem('p_email', signupForm.email);
    if (rememberMe) {
      localStorage.setItem('remembered_email', signupForm.email);
    }
    simulateLogin();
  };

  const simulateLogin = () => {
    localStorage.setItem('pawhoof_login', 'true');
    setIsLoggedIn(true);
    setTimeout(() => {
      setAuthView('profile');
      loadProfileData();
    }, 500);
  };

  const toggleLike = (animalId) => {
    setLikedAnimals(prev => {
      const newLikes = prev.includes(animalId) 
        ? prev.filter(id => id !== animalId)
        : [...prev, animalId];
      localStorage.setItem('liked_animals', JSON.stringify(newLikes));
      return newLikes;
    });
  };

  const toggleAdopt = (animalId) => {
    setAdoptedAnimals(prev => {
      const newAdopted = prev.includes(animalId)
        ? prev.filter(id => id !== animalId)
        : [...prev, animalId];
      localStorage.setItem('adopted_animals', JSON.stringify(newAdopted));
      return newAdopted;
    });
  };

  const handleLocationClick = (animal) => {
    setSelectedLocation({ lat: animal.lat, lng: animal.lng, name: animal.location });
    setMapExpanded(false);
    setTimeout(() => {
      const mapSection = document.getElementById('feed');
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const filteredAnimals = animals.filter(animal => {
    const matchesType = selectedAnimalType === 'all' || animal.type === selectedAnimalType;
    const matchesGender = selectedGender === 'all' || animal.gender.toLowerCase() === selectedGender.toLowerCase();
    const matchesSearch = !searchQuery || animal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         animal.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         animal.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesGender && matchesSearch;
  });

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
    setCurrentTheme(theme);
    localStorage.setItem('pawhoof_theme', theme);
    document.body.removeAttribute('data-theme');
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    }
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
      setIsEditingProfile(false);
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
    setFormErrors({});
  };

  const logout = () => {
    localStorage.removeItem('pawhoof_login');
    localStorage.removeItem('profile_image');
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
      localStorage.setItem('profile_image', profileImage);
    }
    setIsEditingProfile(false);
    alert("Profile Saved!");
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
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

  const handleStartDonating = () => {
    const adoptSection = document.getElementById('pets');
    if (adoptSection) {
      adoptSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetLocation = () => {
    setSelectedLocation(null);
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
        <div className="logo">
          <img src="/src/Paw'nHoof.png" alt="Paw'nHoof" className="logo-img" />
        </div>
        
        <div className="nav-center">
          <div className="search-bar-container">
            <span className="search-icon"></span>
            <input 
              type="text" 
              className="search-bar" 
              placeholder="search anything"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button className="nav-like-btn" onClick={() => alert(`You have liked ${likedAnimals.length} animals`)}>
            <i className="fa-solid fa-heart"></i>
            {likedAnimals.length > 0 && <span className="like-count">{likedAnimals.length}</span>}
          </button>
          
          <button className="nav-basket-btn" onClick={() => alert(`You have ${adoptedAnimals.length} animals in your basket`)}>
            <span className="basket-icon"></span>
            {adoptedAnimals.length > 0 && <span className="basket-count">{adoptedAnimals.length}</span>}
          </button>
        </div>
        
        <div className="auth-btn-container">
          {!isLoggedIn ? (
            <button className="login-btn" onClick={() => openAuthModal('login')}>Sign In</button>
          ) : (
            <div className="user-avatar-nav" onClick={() => openAuthModal('profile')} style={{display: 'flex'}}>
              <img src={profileImage || `https://ui-avatars.com/api/?name=${profileData.name}&background=5e3fdc&color=fff`} alt="User" />
            </div>
          )}
        </div>
      </nav>

      {/* Floating Tools */}
        <div className="floating-tools-container" id="floating-tools">
        <div className={`floating-menu ${floatingMenuActive ? 'active' : ''}`}>
          <button className="float-btn" onClick={handleScrollTop} title="Scroll Top">
            <i className="fa-solid fa-arrow-up"></i>
          </button>
          <button className="float-btn" onClick={() => window.history.back()} title="Go Back">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button className="float-btn btn-setting" onClick={openSettings} title="Settings">
            <i className="fa-solid fa-gear"></i>
          </button>
        </div>
        <button className={`float-btn main-toggle ${floatingMenuActive ? 'active' : ''}`} onClick={toggleFloatingMenu}>+</button>
      </div>

      {/* Settings Panel */}
      <div className={`settings-overlay ${settingsPanelActive ? 'active' : ''}`} onClick={closeSettings}></div>
      <div className={`settings-panel ${settingsPanelActive ? 'active' : ''}`}>
        <div className="settings-header">
          <h3><i className="fa-solid fa-gear"></i> Settings</h3>
          <span className="close-icon" onClick={closeSettings}>&times;</span>
        </div>

        <div className="settings-group">
          <h4>Theme</h4>
          <div className="theme-options">
            <button
              className={`theme-btn ${currentTheme === 'light' ? 'active' : ''}`}
              onClick={() => setTheme('light')}
            >
              <span className="icon-sun"></span> Light
            </button>
            <button
              className={`theme-btn ${currentTheme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme('dark')}
            >
              <span className="icon-moon"></span> Dark
            </button>
            <button
              className={`theme-btn ${currentTheme === 'pastel' ? 'active' : ''}`}
              onClick={() => setTheme('pastel')}
            >
              <span className="icon-palette"></span> Pastel
            </button>
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
          <div className={`auth-card ${authTab === 'signup' ? 'slide-right' : 'slide-left'}`}>
            <span className="close-modal" onClick={closeAuthModal}>&times;</span>

            {authView === 'auth' ? (
              <div>
                <div className="auth-tabs">
                  <button className={`tab-btn ${authTab === 'login' ? 'active' : ''}`} onClick={() => switchAuthTab('login')}>Login</button>
                  <button className={`tab-btn ${authTab === 'signup' ? 'active' : ''}`} onClick={() => switchAuthTab('signup')}>Sign Up</button>
                </div>

                {authTab === 'login' ? (
                  <div className="auth-form">
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        placeholder="user@gmail.com" 
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      />
                      {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      />
                      {formErrors.password && <span className="error-text">{formErrors.password}</span>}
                    </div>
                    <div className="form-group">
                      <label className="remember-me">
                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        <span className="remember-me-text">Remember Me</span>
                      </label>
                    </div>
                    <button className="login-btn" style={{width: '100%'}} onClick={handleLogin}>Login</button>
                  </div>
                ) : (
                  <div className="auth-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter Your Name" 
                        value={signupForm.name}
                        onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                      />
                      {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        placeholder="user@gmail.com" 
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                      />
                      {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input 
                        type="password" 
                        placeholder="Create Password (min 8 chars)" 
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                      />
                      {formErrors.password && <span className="error-text">{formErrors.password}</span>}
                    </div>
                    <div className="form-group">
                      <label className="remember-me">
                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        <span className="remember-me-text">Remember Me</span>
                      </label>
                    </div>
                    <button className="login-btn" style={{width: '100%'}} onClick={handleSignup}>Create Account</button>
                  </div>
                )}

                <div className="social-login">
                  <button className="social-btn btn-facebook">
                    <i className="fa-brands fa-facebook-f"></i>
                    <span>Continue with Facebook</span>
                  </button>
                  <button className="social-btn btn-google">
                    <i className="fa-brands fa-google"></i>
                    <span>Sign in with Google</span>
                  </button>
                  <button className="social-btn btn-apple">
                    <i className="fa-brands fa-apple"></i>
                    <span>Continue with Apple</span>
                  </button>
                  <button className="social-btn btn-microsoft">
                    <i className="fa-brands fa-microsoft"></i>
                    <span>Microsoft</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {!isEditingProfile ? (
                  <div className="profile-view">
                    <div className="profile-header">
                      <div className="profile-pic-upload">
                        <img 
                          src={profileImage || `https://ui-avatars.com/api/?name=${profileData.name}&background=5e3fdc&color=fff`} 
                          alt="Profile" 
                        />
                      </div>
                      <h3>{profileData.name}</h3>
                      {profileData.email && <p className="profile-email">{profileData.email}</p>}
                      {profileData.dob && <p className="profile-age">Age: {calculateAge(profileData.dob)} years</p>}
                      {profileData.mobile && (
                        <p className="profile-mobile">
                          <i className="fa-solid fa-phone"></i> {profileData.mobile}
                          <span className="verified-tick">✓</span>
                        </p>
                      )}
                      {profileData.address && (
                        <p className="profile-address">
                          <i className="fa-solid fa-location-dot"></i> {profileData.address}
                        </p>
                      )}
                      {profileData.gender && <p className="profile-gender">Gender: {profileData.gender}</p>}
                    </div>
                    <button className="login-btn" style={{width: '100%', marginBottom: '10px'}} onClick={() => setIsEditingProfile(true)}>Edit Profile</button>
                    <button className="logout-btn" onClick={logout}>Log Out</button>
                  </div>
                ) : (
                  <div className="profile-edit">
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
                          <i className="fa-solid fa-camera"></i>
                        </label>
                      </div>
                      <h3>Edit Profile</h3>
                      <label 
                        htmlFor="profile-pic-input" 
                        className="upload-image-btn"
                      >
                        📤 Upload Profile Photo
                      </label>
                    </div>

                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" value={profileData.name} onChange={(e) => handleProfileChange('name', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input type="date" value={profileData.dob} onChange={(e) => handleProfileChange('dob', e.target.value)} />
                      {profileData.dob && <p className="age-preview">Age: {calculateAge(profileData.dob)} years</p>}
                    </div>
                    <div className="form-group">
                      <label>Mobile</label>
                      <div className="mobile-input-group">
                        <input type="tel" value={profileData.mobile} placeholder="+91 0000000000" onChange={(e) => handleProfileChange('mobile', e.target.value)} />
                        {profileData.mobile && profileData.mobile.length >= 10 && <span className="verified-tick">✓</span>}
                      </div>
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
                    <button className="logout-btn" onClick={() => setIsEditingProfile(false)}>Cancel</button>
                  </div>
                )}
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
          <button className="account-btn start-donating-btn" onClick={handleStartDonating}>Start Donating</button>
        </div>
        <div className="hero-visual">
          <div className="blob">
            <div style={{fontSize: '8rem'}}>🐶🐱🐮🐷</div>
          </div>
        </div>
      </section>

      {/* Adopt a Friend Section with Filters */}
      <div className="pets-section" id="pets">
        <h2 className="section-title">Adopt a Friend</h2>
        
        <div className="filter-section">
          <div className="filter-group">
            <label>Animal Type:</label>
            <select value={selectedAnimalType} onChange={(e) => setSelectedAnimalType(e.target.value)}>
              <option value="all">All Animals</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="squirrel">Squirrel</option>
              <option value="goat">Goat</option>
              <option value="horse">Horse</option>
              <option value="cow">Cow</option>
              <option value="buffalo">Buffalo</option>
              <option value="ox">Ox</option>
              <option value="camel">Camel</option>
              <option value="pig">Pig</option>
              <option value="sheep">Sheep</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Gender:</label>
            <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label className="toggle-label">
              <input type="checkbox" checked={nearbyOnly} onChange={(e) => setNearbyOnly(e.target.checked)} />
              <span>Nearby Only</span>
            </label>
          </div>
        </div>

        <div className="pet-grid">
          {filteredAnimals.map((animal) => (
            <div key={animal.id} className="pet-card">
              <div className="pet-img-box">
                <img src={animal.image} alt={animal.name} className="pet-image" />
              </div>
              <div className="pet-details">
                {animal.needsRescue && (
                  <div className="rescue-bubble" title="Needs Rescue">
                    <i className="fa-solid fa-triangle-exclamation rescue-icon"></i>
                    <span className="rescue-tooltip">Needs Rescue</span>
                  </div>
                )}
                <div className="pet-name">{animal.name}</div>
                <div className="pet-breed">{animal.breed} <span className="animal-type">({animal.type})</span></div>
                <div className="pet-info">
                  <span>Gender: {animal.gender}</span>
                  <span>Age: {animal.age}</span>
                </div>
                <div className="location-tag btn-location" onClick={() => handleLocationClick(animal)} style={{cursor: 'pointer'}}>
                  <i className="fa-solid fa-location-dot"></i> {animal.location}
                </div>
                <div className="card-actions">
                  <button 
                    className={`btn-adopt ${adoptedAnimals.includes(animal.id) ? 'adopted' : ''}`}
                    onClick={() => toggleAdopt(animal.id)}
                  >
                    <span className="basket-icon-small"></span>
                    <span>Adopt Me</span>
                  </button>
                  <button 
                    className={`btn-heart ${likedAnimals.includes(animal.id) ? 'active' : ''}`}
                    onClick={() => toggleLike(animal.id)}
                    title="Like"
                  >
                    <i className="fa-solid fa-heart"></i> Like
                  </button>
                  {animal.needsMedical && (
                    <button className="btn-medical" onClick={() => alert('Medical aid requested for ' + animal.name)}>
                      <i className="fa-solid fa-briefcase-medical"></i> Medical Help
                    </button>
                  )}
                  {animal.needsDonate && (
                    <button className="btn-donate" onClick={() => alert('Donation requested for ' + animal.name)}>
                      <i className="fa-solid fa-hand-holding-dollar"></i> Donate Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feed Section */}
      <section className="section-container" id="feed">
        <h2 className="section-title">Feed Centers & Map</h2>
        <div className={`feed-layout ${mapExpanded ? 'expanded' : ''}`}>
          <div className="map-wrapper">
            <div className={`map-container ${mapExpanded ? 'fullscreen' : ''}`}>
              <iframe 
                src={selectedLocation 
                  ? `https://www.openstreetmap.org/export/embed.html?bbox=${selectedLocation.lng-0.01}%2C${selectedLocation.lat-0.01}%2C${selectedLocation.lng+0.01}%2C${selectedLocation.lat+0.01}&layer=mapnik&marker=${selectedLocation.lat}%2C${selectedLocation.lng}`
                  : userLocation
                    ? `https://www.openstreetmap.org/export/embed.html?bbox=${userLocation.lng-0.01}%2C${userLocation.lat-0.01}%2C${userLocation.lng+0.01}%2C${userLocation.lat+0.01}&layer=mapnik&marker=${userLocation.lat}%2C${userLocation.lng}`
                    : "https://www.openstreetmap.org/export/embed.html?bbox=78.9400%2C21.0600%2C79.0200%2C21.1300&layer=mapnik&marker=21.0968%2C78.9814"
                }
                style={{border: 0}} 
                allowFullScreen 
                loading="lazy"
              />
              <button className="expand-map-btn" onClick={() => setMapExpanded(!mapExpanded)} title={mapExpanded ? 'Close' : 'Expand'}>
                <span className={mapExpanded ? 'icon-close' : 'icon-expand'}></span>
              </button>
            </div>
            <div className="location-bar">
              <div className="live-indicator">
                <span className="pulse-dot"></span> Live
                <button className="reset-location-btn" onClick={resetLocation} title="Reset to my location">
                  <i className="fa-solid fa-location-crosshairs"></i>
                </button>
              </div>
              <span className="location-text">
                {selectedLocation ? (
                  <>
                    <i className="fa-solid fa-location-dot"></i> {selectedLocation.name}
                  </>
                ) : locationText}
              </span>
            </div>
          </div>
          <div className="feed-info">
            <h3>Locate Hungry Souls</h3>
            <p style={{fontSize: '1.2rem', lineHeight: 1.6}}>
              Use our symmetrical map interface to find feeding centers near <strong>Nagpur</strong>. Donate food or visit personally to feed cows, dogs, and goats.
            </p>
            <br/>
            <button className="btn-adopt view-location-btn btn-location" onClick={() => {
              const mapSection = document.getElementById('feed');
              if (mapSection) {
                mapSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              <i className="fa-solid fa-location-dot"></i> View Location
            </button>
          </div>
        </div>
      </section>

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
                <img src="/Paw'nHoof.png" alt="Paw'nHoof" className="footer-logo-img" />
                <h2 className="footer-brand-text">Paw'nHoof</h2>
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
