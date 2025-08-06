// Animation utilities
const animateElement = (el, keyframes, options) => {
    if ('animate' in el) {
        return el.animate(keyframes, options);
    }
    return null;
};

// Mobile navigation with advanced animations
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
let menuOpen = false;

// Create the hamburger bars if they don't exist
if (hamburger && hamburger.children.length === 0) {
    for (let i = 0; i < 3; i++) {
        const bar = document.createElement('span');
        bar.className = 'bar';
        hamburger.appendChild(bar);
    }
}

// Set index for staggered animations
navItems.forEach((item, index) => {
    item.style.setProperty('--i', index);
});

hamburger.addEventListener('click', () => {
    // Toggle hamburger animation
    hamburger.classList.toggle('active');
    
    // Toggle nav menu with animation
    navLinks.classList.toggle('active');
    menuOpen = !menuOpen;
    
    // Apply body scroll lock when menu is open
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    
    // Animate the nav items with staggered entrance
    navItems.forEach((item, index) => {
        if (menuOpen) {
            // Reset and then apply animation for clean state
            item.style.opacity = "0";
            item.style.transform = "translateY(30px)";
            
            // Trigger animation with small delay based on index
            setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }, 100 + (index * 50));
        }
    });
});

// Apple-style slideshow with smooth transitions
let slideIndex = 0;
let slides = document.getElementsByClassName("rainbowSlides");
let dots = document.getElementsByClassName("dot");

function showSlides() {
    let i;
    // Hide all slides with fade out effect
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].style.opacity = 0;
    }
    
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    
    // Update dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Display current slide with animation
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    
    // Subtle scale and opacity animation like Apple's keynotes
    animateElement(slides[slideIndex - 1], [
        { opacity: 0, transform: 'scale(1.02)' },
        { opacity: 1, transform: 'scale(1)' }
    ], {
        duration: 1200,
        easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
        fill: 'forwards'
    });
    
    setTimeout(showSlides, 5000);
}

// Start slideshow with slight delay for page load
setTimeout(showSlides, 300);

// Apple-style section transitions
function activateSection(sectionId, navId) {
    // Get current active section for transition out
    const currentSection = document.querySelector('.section.sectionActive');
    
    // Update navigation styling
    document.querySelectorAll('.top-nav a').forEach(link => {
        link.classList.remove('sectionActive');
    });
    document.getElementById(navId).classList.add('sectionActive');
    
    // Only animate if there's a current section visible
    if (currentSection) {
        // Fade out current section
        animateElement(currentSection, [
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: 300,
            easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
            fill: 'forwards'
        }).onfinish = () => {
            // Hide old section and show new one
            document.querySelectorAll('.section').forEach(sec => {
                sec.classList.remove('sectionActive');
            });
            const newSection = document.getElementById(sectionId);
            newSection.classList.add('sectionActive');
            
            // Fade in new section
            animateElement(newSection, [
                { opacity: 0, transform: 'translateY(20px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 500,
                easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
                fill: 'forwards'
            });
        };
    } else {
        // If no current section (first load), just show the new section
        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.remove('sectionActive');
        });
        document.getElementById(sectionId).classList.add('sectionActive');
    }
}

// Add Apple-style scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.info, .rainbowNews, .rainbowMedia, .rainbowEvent');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});