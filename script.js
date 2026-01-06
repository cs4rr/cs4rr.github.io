// ========================================
// TYPING ANIMATION
// ========================================
const typingTexts = [
    'QA Engineer with 6+ years experience',
    'Transitioning to Cybersecurity',
    'ISTQB Certified Professional',
    'TryHackMe Security Student',
    'Pentester in Training'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const typingElement = document.querySelector('.typing-text');
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

// ========================================
// PARTICLE ANIMATION
// ========================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.5 ? '#00ff00' : '#00ffff'};
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 10px currentColor;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Add float animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(20px, -20px) scale(1.1);
            opacity: 0.6;
        }
        50% {
            transform: translate(-20px, 20px) scale(0.9);
            opacity: 0.4;
        }
        75% {
            transform: translate(20px, 20px) scale(1.05);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// SMOOTH SCROLL
// ========================================
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

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// ========================================
// TERMINAL CURSOR ANIMATION
// ========================================
function animateTerminalCursor() {
    const cursors = document.querySelectorAll('.cursor-blink');
    cursors.forEach(cursor => {
        cursor.style.animation = 'blink 1s infinite';
    });
}

// ========================================
// SOCIAL BUTTONS FUNCTIONALITY
// ========================================
function setupSocialButtons() {
    const buttons = document.querySelectorAll('.social-buttons button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim().toLowerCase();
            
            // You'll need to replace these with your actual links
            const links = {
                'email': 'mailto:cesar.ayala1305@gmail.com',
                'linkedin': 'https://linkedin.com/in/ces-sebastian-ayala/',
                'github': 'https://github.com/cs4rr'
            };
            
            for (let [key, url] of Object.entries(links)) {
                if (buttonText.includes(key)) {
                    window.open(url, '_blank');
                    break;
                }
            }
        });
    });
}

// ========================================
// GLITCH EFFECT ON SCROLL
// ========================================
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const glitchElement = document.querySelector('.glitch');
    
    if (Math.abs(scrollTop - lastScrollTop) > 50) {
        glitchElement.style.animation = 'none';
        setTimeout(() => {
            glitchElement.style.animation = 'glitchPulse 3s infinite';
        }, 10);
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

// ========================================
// MATRIX RAIN EFFECT (Optional)
// ========================================
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        opacity: 0.1;
        pointer-events: none;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            ctx.fillText(text, x, y);
            
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========================================
// TERMINAL TYPING EFFECT FOR CONTACT
// ========================================
function typeContactInfo() {
    const lines = document.querySelectorAll('.contact-terminal .success');
    let delay = 0;
    
    lines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.transition = 'opacity 0.5s ease-in';
            line.style.opacity = '1';
        }, delay);
        delay += 200;
    });
}

// ========================================
// SKILL BADGE HOVER EFFECTS
// ========================================
function setupSkillBadges() {
    const badges = document.querySelectorAll('.skill-badge');
    
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 255, 0, 0.1)';
            this.style.borderLeft = '4px solid #00ff00';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.05)';
            this.style.borderLeft = 'none';
        });
    });
}

// ========================================
// EASTER EGG: KONAMI CODE
// ========================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        const terminal = document.querySelector('.terminal-contact .contact-terminal');
        const easterEgg = document.createElement('div');
        easterEgg.innerHTML = `
<span class="success">
╔═══════════════════════════════════════════╗
║  🎮 KONAMI CODE ACTIVATED! 🎮            ║
║  You found the secret developer mode!    ║
║  Extra XP: +1337 pts                     ║
╚═══════════════════════════════════════════╝
</span>`;
        terminal.appendChild(easterEgg);
        
        // Add extra matrix rain
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createMatrixRain(), i * 100);
        }
    }
});

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(typeText, 1000);
    
    // Create particles
    createParticles();
    
    // Setup interactive elements
    setupSocialButtons();
    setupSkillBadges();
    animateTerminalCursor();
    
    // Optional: Add matrix rain effect
    // Uncomment if you want the matrix rain background
    // createMatrixRain();
    
    // Animate contact info on scroll
    const contactSection = document.getElementById('contact');
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeContactInfo();
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (contactSection) {
        contactObserver.observe(contactSection);
    }
    
    console.log('%c🔐 Security Portfolio Loaded', 'color: #00ff00; font-size: 20px; font-weight: bold;');
    console.log('%cLooking for Easter eggs? Try the Konami Code! ↑↑↓↓←→←→BA', 'color: #00ffff; font-size: 12px;');
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based animations here
    });
}, { passive: true });