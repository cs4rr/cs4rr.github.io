// ========================================
// PARTICLE ANIMATION
// ========================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.5 ? '#00ff00' : '#00ffff'};
            border-radius: 50%;
            opacity: ${Math.random() * 0.4 + 0.2};
            animation: float ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 10px currentColor;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
        }
        25% {
            transform: translate(15px, -15px) scale(1.1);
            opacity: 0.5;
        }
        50% {
            transform: translate(-15px, 15px) scale(0.9);
            opacity: 0.3;
        }
        75% {
            transform: translate(15px, 15px) scale(1.05);
            opacity: 0.4;
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
// INTERSECTION OBSERVER
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// ========================================
// GLITCH EFFECT ON SCROLL
// ========================================
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const glitchElement = document.querySelector('.glitch');
    
    if (glitchElement && Math.abs(scrollTop - lastScrollTop) > 100) {
        glitchElement.style.animation = 'none';
        setTimeout(() => {
            glitchElement.style.animation = 'glitchPulse 3s infinite';
        }, 10);
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

// ========================================
// EASTER EGG: KONAMI CODE
// ========================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        const terminal = document.querySelector('.contact-terminal');
        if (terminal) {
            const easterEgg = document.createElement('div');
            easterEgg.innerHTML = `
<span class="success">
╔═══════════════════════════════════════════╗
║  🎮 KONAMI CODE ACTIVATED! 🎮            ║
║  Easter Egg: You found the secret!      ║
║  Extra Security XP: +1337 pts           ║
╚═══════════════════════════════════════════╝
</span>`;
            terminal.appendChild(easterEgg);
        }
    }
});

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Create particles
    createParticles();
    
    // Console message
    console.log('%c🔐 Security Portfolio', 'color: #00ff00; font-size: 20px; font-weight: bold;');
    console.log('%cBuscás algún Easter egg? Probá el "Konami Code"! ↑↑↓↓←→←→BA', 'color: #00ffff; font-size: 12px;');
    console.log('%cDeveloped with SNES.css + Custom Security CSS by cs4rr', 'color: #33ff33; font-size: 10px;');
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Optimized scroll animations
    });
}, { passive: true });

// ========================================
// HACKER TERMINAL GAME
// ========================================
const HackerGame = {
    commands: [
        'nmap -sV 192.168.1.1',
        'sudo metasploit',
        'exploit/multi/handler',
        'use auxiliary/scanner/http/dir_scanner',
        'searchsploit apache 2.4',
        'msfvenom -p windows/meterpreter/reverse_tcp',
        'nc -lvnp 4444',
        'python3 -m http.server 8000',
        'sqlmap -u "http://target.com" --dbs',
        'hydra -l admin -P pass.txt ssh://target',
        'john --wordlist=rockyou.txt hash.txt',
        'aircrack-ng -w wordlist capture.cap',
        'burpsuite --proxy=127.0.0.1:8080',
        'wpscan --url http://target.com',
        'nikto -h http://192.168.1.1',
        'gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt',
        'enum4linux -a 192.168.1.100',
        'responder -I eth0 -wrf',
        'crackmapexec smb 192.168.1.0/24',
        'bloodhound-python -d domain.local -u user -p pass -c all',
    ],
    
    score: 0,
    level: 1,
    timeLeft: 30,
    currentCommand: '',
    timer: null,
    bestScore: 0,
    
    init() {
        this.loadBestScore();
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        const modal = document.getElementById('hackerGameModal');
        const openBtn = document.getElementById('hackerGameBtn');
        const closeBtn = document.getElementById('closeGame');
        const startBtn = document.getElementById('startGame');
        const resetBtn = document.getElementById('resetGame');
        const input = document.getElementById('gameInput');
        
        openBtn?.addEventListener('click', () => this.openModal());
        closeBtn?.addEventListener('click', () => this.closeModal());
        startBtn?.addEventListener('click', () => this.startGame());
        resetBtn?.addEventListener('click', () => this.resetGame());
        
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkCommand();
            }
        });
        
        // Close on outside click
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    },
    
    openModal() {
        const modal = document.getElementById('hackerGameModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    closeModal() {
        const modal = document.getElementById('hackerGameModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        this.stopGame();
    },
    
    startGame() {
        this.score = 0;
        this.level = 1;
        this.timeLeft = 30;
        
        document.getElementById('gameScore').textContent = this.score;
        document.getElementById('gameLevel').textContent = this.level;
        document.getElementById('gameTime').textContent = this.timeLeft;
        document.getElementById('gameResult').textContent = '';
        document.getElementById('gameInput').disabled = false;
        document.getElementById('gameInput').focus();
        document.getElementById('startGame').style.display = 'none';
        document.getElementById('resetGame').style.display = 'inline-block';
        
        this.nextCommand();
        this.startTimer();
    },
    
    stopGame() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        document.getElementById('gameInput').disabled = true;
        document.getElementById('startGame').style.display = 'inline-block';
        document.getElementById('resetGame').style.display = 'none';
    },
    
    resetGame() {
        this.stopGame();
        document.getElementById('gameInput').value = '';
        document.getElementById('targetCommand').textContent = '';
        document.getElementById('gameResult').textContent = '';
    },
    
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            document.getElementById('gameTime').textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.endGame();
            } else if (this.timeLeft <= 10) {
                document.getElementById('gameTime').style.color = 'var(--hacker-red)';
            }
        }, 1000);
    },
    
    nextCommand() {
        const randomIndex = Math.floor(Math.random() * this.commands.length);
        this.currentCommand = this.commands[randomIndex];
        document.getElementById('targetCommand').textContent = this.currentCommand;
        document.getElementById('gameInput').value = '';
        document.getElementById('gameInput').focus();
    },
    
    checkCommand() {
        const input = document.getElementById('gameInput').value.trim();
        const result = document.getElementById('gameResult');
        
        if (input === this.currentCommand) {
            // Correct!
            const points = Math.floor(this.currentCommand.length * this.level * 1.5);
            this.score += points;
            this.timeLeft += 2; // Bonus time
            
            result.textContent = `✓ ACCESO CONCEDIDO! +${points} pts`;
            result.className = 'game-result success';
            
            document.getElementById('gameScore').textContent = this.score;
            
            // Level up every 5 commands
            if (this.score % 500 === 0 && this.score > 0) {
                this.level++;
                document.getElementById('gameLevel').textContent = this.level;
                result.textContent += ` | 🎯 NIVEL ${this.level}!`;
                this.timeLeft += 5; // Extra bonus for level up
            }
            
            setTimeout(() => {
                result.textContent = '';
                this.nextCommand();
            }, 1000);
            
        } else {
            // Wrong
            result.textContent = '✗ ACCESO DENEGADO! Intenta de nuevo...';
            result.className = 'game-result error';
            document.getElementById('gameInput').value = '';
            
            setTimeout(() => {
                result.textContent = '';
            }, 1500);
        }
    },
    
    endGame() {
        this.stopGame();
        const result = document.getElementById('gameResult');
        
        result.textContent = `🔒 SISTEMA BLOQUEADO! Puntaje Final: ${this.score} pts`;
        result.className = 'game-result';
        result.style.color = 'var(--terminal-cyan)';
        result.style.fontSize = '1.1rem';
        
        // Check if new best score
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            this.saveBestScore();
            document.getElementById('bestScore').textContent = `${this.bestScore} pts 🏆 NUEVO RÉCORD!`;
            
            result.textContent += ' 🎉 ¡NUEVO RÉCORD!';
        }
        
        document.getElementById('gameTime').style.color = 'var(--terminal-cyan)';
    },
    
    saveBestScore() {
        try {
            localStorage.setItem('hackerGameBestScore', this.bestScore.toString());
        } catch (e) {
            console.log('LocalStorage no disponible');
        }
    },
    
    loadBestScore() {
        try {
            const saved = localStorage.getItem('hackerGameBestScore');
            if (saved) {
                this.bestScore = parseInt(saved);
                document.getElementById('bestScore').textContent = `${this.bestScore} pts`;
            }
        } catch (e) {
            console.log('LocalStorage no disponible');
        }
    }
};

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    HackerGame.init();

});
