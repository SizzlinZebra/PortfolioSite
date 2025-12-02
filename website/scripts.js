// website/scripts.js

// 1. Side Navigation with Snake Effect & Magnetic Sticky
const navLinks = document.querySelectorAll('.nav-link');
const snakeEffect = document.getElementById('snake-effect');

// Update active link and snake position based on scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 200;

    // Check if we're on a page with sections
    if (sections.length === 0) {
        // For pages like gym.html, travel.html, courses.html
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Remove active from all
            link.classList.remove('active');
            // Add active if matches current page
            if (href.includes(currentPage) && currentPage !== 'index') {
                link.classList.add('active');
                updateSnakePosition(link);
            }
        });
        return;
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                updateSnakePosition(activeLink);
            }
        }
    });
}

// Update snake position with smooth animation
function updateSnakePosition(link) {
    const linkRect = link.getBoundingClientRect();
    const navRect = document.querySelector('.sidebar-nav').getBoundingClientRect();
    
    const linkTop = linkRect.top - navRect.top;
    snakeEffect.style.top = (linkTop + linkRect.height / 2) + 'px';
}

// Smooth scroll on nav link click with magnetic effect
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If it's an internal link on the same page
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                updateSnakePosition(link);
            }
        }
        // Otherwise, let the default link behavior handle navigation
    });

    // Add hover magnetic effect
    link.addEventListener('mouseenter', () => {
        if (!link.classList.contains('active')) {
            link.style.transform = 'scale(1.08)';
        }
    });

    link.addEventListener('mouseleave', () => {
        if (!link.classList.contains('active')) {
            link.style.transform = 'scale(1)';
        }
    });
});

// Update on scroll
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) updateSnakePosition(activeLink);
});

// Initialize
updateActiveNav();
