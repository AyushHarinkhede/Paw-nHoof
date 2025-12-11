
        // --- FLOATING TOOLS LOGIC ---
        function toggleFloatingMenu() {
            document.getElementById('floating-menu').classList.toggle('active');
            document.querySelector('.main-toggle').classList.toggle('active');
        }

        // --- SETTINGS PANEL LOGIC ---
        function openSettings() {
            document.getElementById('settings-panel').classList.add('active');
            document.getElementById('settings-overlay').classList.add('active');
        }

        function closeSettings() {
            document.getElementById('settings-panel').classList.remove('active');
            document.getElementById('settings-overlay').classList.remove('active');
        }

        function setTheme(theme) {
            document.body.removeAttribute('data-theme');
            if (theme === 'dark') document.body.setAttribute('data-theme', 'dark');
            // Pastel is default, Light is slightly cleaner version (omitted for simplicity, used default)
        }

        function setZoom(val) {
            document.body.style.zoom = val + "%";
            // Note: 'zoom' works in Chrome/Edge. For Firefox use transform scale if needed.
        }

        function toggleToolsVisibility(checkbox) {
            const tools = document.getElementById('floating-tools');
            tools.style.display = checkbox.checked ? 'flex' : 'none';
        }

        // --- AUTH & PROFILE LOGIC ---
        const authModal = document.getElementById('auth-modal');
        const viewAuth = document.getElementById('view-auth');
        const viewProfile = document.getElementById('view-profile');
        const navLoginBtn = document.getElementById('nav-login-btn');
        const navAvatar = document.getElementById('nav-user-avatar');

        // Check Login State on Load
        window.onload = function() {
            const isLoggedIn = localStorage.getItem('pawhoof_login');
            if (isLoggedIn === 'true') {
                updateNavToLoggedIn();
                loadProfileData();
            }
            
            // Location Simulation
            setTimeout(() => {
                document.querySelector('.location-text').innerText = "📍 Hingna, Nagpur (MH)";
            }, 1500);
        }

        function openAuthModal(mode) {
            authModal.style.display = 'flex';
            const isLoggedIn = localStorage.getItem('pawhoof_login') === 'true';

            if (isLoggedIn || mode === 'profile') {
                viewAuth.classList.add('hidden');
                viewProfile.classList.remove('hidden');
            } else {
                viewProfile.classList.add('hidden');
                viewAuth.classList.remove('hidden');
                switchAuthTab('login'); // Default to login
            }
        }

        function closeAuthModal() {
            authModal.style.display = 'none';
        }

        function switchAuthTab(tab) {
            const btns = document.querySelectorAll('.tab-btn');
            btns.forEach(b => b.classList.remove('active'));
            
            if (tab === 'login') {
                document.getElementById('login-form').classList.remove('hidden');
                document.getElementById('signup-form').classList.add('hidden');
                btns[0].classList.add('active');
            } else {
                document.getElementById('login-form').classList.add('hidden');
                document.getElementById('signup-form').classList.remove('hidden');
                btns[1].classList.add('active');
            }
        }

        function simulateLogin() {
            // In a real app, verify backend here
            localStorage.setItem('pawhoof_login', 'true');
            
            // Loading animation simulation
            const btn = document.querySelector('#view-auth .login-btn');
            const originalText = btn.innerText;
            btn.innerText = "Processing...";
            
            setTimeout(() => {
                btn.innerText = originalText;
                updateNavToLoggedIn();
                viewAuth.classList.add('hidden');
                viewProfile.classList.remove('hidden');
            }, 1000);
        }

        function updateNavToLoggedIn() {
            navLoginBtn.style.display = 'none';
            navAvatar.style.display = 'flex';
            // Set avatar text to first initial
            const name = localStorage.getItem('p_name') || 'Ayush';
            document.getElementById('nav-img').src = "https://ui-avatars.com/api/?name=" + name + "&background=2d4a3e&color=fff";
        }

        function logout() {
            localStorage.removeItem('pawhoof_login');
            navLoginBtn.style.display = 'block';
            navAvatar.style.display = 'none';
            closeAuthModal();
            alert("Logged out successfully");
        }

        // --- PROFILE DATA HANDLING ---
        function saveProfile() {
            const name = document.getElementById('p-name').value;
            const mobile = document.getElementById('p-mobile').value;
            const addr = document.getElementById('p-address').value;
            
            localStorage.setItem('p_name', name);
            localStorage.setItem('p_mobile', mobile);
            localStorage.setItem('p_addr', addr);
            
            document.getElementById('display-name').innerText = name;
            updateNavToLoggedIn(); // Update avatar
            alert("Profile Saved!");
        }

        function loadProfileData() {
            if(localStorage.getItem('p_name')) {
                document.getElementById('p-name').value = localStorage.getItem('p_name');
                document.getElementById('display-name').innerText = localStorage.getItem('p_name');
            }
            if(localStorage.getItem('p_mobile')) document.getElementById('p-mobile').value = localStorage.getItem('p_mobile');
            if(localStorage.getItem('p_addr')) document.getElementById('p-address').value = localStorage.getItem('p_addr');
        }

        // Close Modal on Outside Click
        window.onclick = function(event) {
            if (event.target == authModal) closeAuthModal();
        }
    