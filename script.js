// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const backToTop = document.querySelector('.back-to-top');
const galleryItems = document.querySelectorAll('.gallery-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

// Functions
function toggleMenu() {
    navLinks.classList.toggle('active');
}

function closeMenu() {
    navLinks.classList.remove('active');
}

function scrollFunction() {
    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Highlight active section in navbar
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

function filterGallery(e) {
    const category = e.target.getAttribute('data-filter');
    
    // Update active button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter gallery items
    galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || category === itemCategory) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // You would typically send this data to a server
    console.log({ name, email, subject, message });
    
    // Show success message (in a real application)
    alert('Thank you for your message! I will get back to you soon.');
    
    // Clear form
    contactForm.reset();
}

// Add animation to skill bars on scroll
function animateSkills() {
    const skillsSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (isElementInViewport(skillsSection)) {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('style').match(/width: (\d+)%/)[1];
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
    }
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Event Listeners
window.addEventListener('scroll', scrollFunction);
window.addEventListener('load', scrollFunction);
hamburger.addEventListener('click', toggleMenu);
navItems.forEach(item => item.addEventListener('click', closeMenu));

filterBtns.forEach(btn => {
    btn.addEventListener('click', filterGallery);
});

if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize animations
window.addEventListener('load', () => {
    // Animate hero section
    document.querySelector('.hero-title').classList.add('animate');
    document.querySelector('.hero-subtitle').classList.add('animate');
    
    // Check for skill animations on scroll
    window.addEventListener('scroll', () => {
        animateSkills();
    });
    
    // Initial check for skill animations
    animateSkills();
});