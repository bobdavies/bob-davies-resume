// Track login state
let isOwner = false;

// Helper function to safely add event listener
function addEventListenerIfExists(elementId, eventType, handler) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener(eventType, handler);
    } else {
        console.error(`Element with id '${elementId}' not found`);
    }
}

function showLoginModal() {
    console.log('Showing login modal');
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    console.log('Closing login modal');
    const modal = document.getElementById('loginModal');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    
    if (modal) {
        modal.style.display = 'none';
    }
    if (username) {
        username.value = '';
    }
    if (password) {
        password.value = '';
    }
}

function attemptLogin() {
    console.log('Attempting login');
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    if (!username || !password) {
        console.error('Login form elements not found');
        return;
    }

    if (username.value === OWNER_USERNAME && password.value === OWNER_PASSWORD) {
        localStorage.setItem('isLoggedIn', 'true');
        closeModal();
        showUploadButton();
    } else {
        alert('Invalid credentials');
    }
}

function logout() {
    console.log('Logging out');
    localStorage.removeItem('isLoggedIn');
    const uploadBtn = document.getElementById('profileUpload');
    if (uploadBtn) {
        uploadBtn.style.display = 'none';
    }
    location.reload();
}

function showUploadButton() {
    console.log('Showing upload button');
    const uploadBtn = document.getElementById('profileUpload');
    const loginBtn = document.getElementById('loginBtn');
    
    if (uploadBtn) {
        uploadBtn.style.display = 'block';
    }
    if (loginBtn) {
        loginBtn.textContent = 'Logout';
        loginBtn.onclick = logout;
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Please select an image smaller than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const profileImage = document.getElementById('profileImage');
            if (profileImage) {
                profileImage.src = e.target.result;
                localStorage.setItem('profileImage', e.target.result);
            }
        };
        reader.readAsDataURL(file);
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');

    // Animate skill bars
    const skillBars = document.querySelectorAll('.language_level');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = `${level * 20}%`;
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Set up button click handlers
    addEventListenerIfExists('loginBtn', 'click', showLoginModal);
    addEventListenerIfExists('loginSubmitBtn', 'click', attemptLogin);
    addEventListenerIfExists('closeModalBtn', 'click', closeModal);

    // Check if already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        showUploadButton();
    }

    // Load saved profile image
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        const profileImage = document.getElementById('profileImage');
        if (profileImage) {
            profileImage.src = savedImage;
        }
    }

    // Set up image upload handler
    const imageUpload = document.getElementById('imageUpload');
    if (imageUpload) {
        imageUpload.addEventListener('change', handleImageUpload);
    }

    // Initialize hover effects
    const items = document.querySelectorAll('.grid_item');
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.02)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
});
