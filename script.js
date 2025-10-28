// ===== MOBILE TAB MODE FUNCTIONS =====
function scrollToSection(id) {
    const element = document.getElementById(id);
    
    if (window.innerWidth <= 768) {
        enableMobileTabMode(id);
    } else {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function enableMobileTabMode(sectionId) {
    if (window.innerWidth > 768) return;
    
    // If Home is clicked, exit tab mode and go back to normal
    if (sectionId === 'home') {
        document.body.classList.remove('mobile-tab-mode');
        document.querySelectorAll('section').forEach(s => s.classList.remove('active-section'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    document.body.classList.add('mobile-tab-mode');
    
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active-section');
    });
    
    // Show the clicked section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active-section');
        addBackButton(section);
        
        // Scroll to section after a short delay
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

function addBackButton(section) {
    // Remove any existing back button
    const existingBtn = section.querySelector('.back-to-top-btn');
    if (existingBtn) existingBtn.remove();
    
    // Create and insert new back button
    const backBtn = document.createElement('button');
    backBtn.className = 'back-to-top-btn';
    backBtn.innerHTML = '← Back to Home';
    backBtn.onclick = (e) => {
        e.preventDefault();
        document.body.classList.remove('mobile-tab-mode');
        document.querySelectorAll('section').forEach(s => s.classList.remove('active-section'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    section.insertBefore(backBtn, section.firstChild);
}

// Handle window resize - exit tab mode on desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.body.classList.remove('mobile-tab-mode');
        document.querySelectorAll('section').forEach(s => s.classList.remove('active-section'));
    }
});

// ===== HAMBURGER MENU =====
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close menu when a navigation link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
    });
});

// ===== SERVICES SIDEBAR =====
function openServicesSidebar() {
    document.getElementById('servicesSidebar').classList.add('active');
    document.getElementById('sidebarOverlay').classList.add('active');
}

function closeSidebar() {
    document.getElementById('servicesSidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

// ===== SERVICES SCROLL =====
function scrollToService(id) {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' });
}

// ===== PROJECTS FILTER =====
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== HERO SLIDER =====
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function autoSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlide();
}

function currentSlide(n) {
    currentSlideIndex = n;
    updateSlide();
}

function updateSlide() {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Start auto-slide
setInterval(autoSlide, 6000);