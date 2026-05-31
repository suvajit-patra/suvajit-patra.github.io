// Track scrolling changes to update navigation states
const headerNav = document.querySelector('.sticky-nav');
const navLogo = document.querySelector('.nav-logo');
const mainTitle = document.querySelector('.profile h1');

// Mobile navigation drawer toggle execution logic
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    // Determine the boundary position relative to the main page title
    const titleBottom = mainTitle.getBoundingClientRect().bottom + window.scrollY;
    
    if (window.scrollY > 40) {
        headerNav.classList.add('scrolled');
    } else {
        headerNav.classList.remove('scrolled');
    }

    if (window.scrollY > titleBottom - 60) {
        navLogo.classList.add('show');
    } else {
        navLogo.classList.remove('show');
    }
});

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents instant bubbling close events
    navLinks.classList.toggle('active');
    
    // Smoothly swap icon from standard bars to an 'X' close indicator
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
    }
});

// Dismiss the column list overlay window automatically once a target anchor link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
    });
});

// Structural close override handling if user clicks completely outside of the menu elements
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    // Assess local storage logic for theme caching
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    // Toggle execution event listener
    themeToggle.addEventListener('click', () => {
        let theme = 'dark';
        if (document.documentElement.getAttribute('data-theme') !== 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
            theme = 'light';
        } else {
            document.documentElement.removeAttribute('data-theme');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
        localStorage.setItem('theme', theme);
    });
});