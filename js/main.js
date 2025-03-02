// Main JavaScript file

// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('#header');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add hover effects for service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'rotateY(180deg)';
    });

    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'rotateY(0)';
    });
});

// Add scroll reveal animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.portfolio-item, .service-card, .skill, .contact-info-item');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Call the function on initial load
revealOnScroll();

// On page load
window.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('#header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animations when elements come into view
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .about-content, .service-card').forEach(el => {
        observer.observe(el);
    });
});

// Add a typing effect to the hero title
function typeEffect(element, text, speed, delay = 0) {
    setTimeout(() => {
        let i = 0;
        element.textContent = '';

        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, speed);
    }, delay);
}

// Apply typing effect to the hero title after page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    typeEffect(heroTitle, originalText, 100);

    // Animate the floating shapes
    animateShapes();
});

// Function to animate the floating shapes
function animateShapes() {
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        // Apply random starting positions
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}

// Add parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Parallax effect for shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.05 * (index + 1);
        shape.style.transform = `translateY(${scrollPosition * speed}px)`;
    });

    // Add subtle parallax to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    }
});