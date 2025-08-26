// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Basic form validation
        // This line is looking for a 'message' field that doesn't exist
        const requiredFields = ['name', 'email', 'phone', 'service', 'message'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            const value = formData.get(field);
            if (!value || value.trim() === '') {
                input.style.borderColor = '#dc3545';
                isValid = false;
            } else {
                input.style.borderColor = '#28a745';
            }
        });
        
        if (isValid) {
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send data to PHP
            fetch('send_mail.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Thank you for your message! We will contact you within 24 hours.');
                    this.reset();
                    // Reset border colors
                    requiredFields.forEach(field => {
                        document.getElementById(field).style.borderColor = '#ddd';
                    });
                } else {
                    alert('Error: ' + (data.error || 'Failed to send message'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Network error. Please try again.');
            })
            .finally(() => {
                // Restore button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Job Application Buttons
document.querySelectorAll('.job-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const jobTitle = this.closest('.job-card').querySelector('h3').textContent;
        alert(`Thank you for your interest in the ${jobTitle} position! Please send your resume to careers@klevantautomation.com`);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .service-item, .job-card, .culture-item, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial body opacity for loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.textContent = footerText.textContent.replace('2024', currentYear);
    }
});