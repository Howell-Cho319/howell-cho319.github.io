// Portfolio page functionality - 2026 Dark Tech Theme
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle canvas
    initParticleCanvas();
    
    // Initialize skill tree animations
    initSkillTree();
    
    // Initialize achievement badges
    initAchievementBadges();
    
    // Initialize certificate gallery
    initCertificateGallery();
    
    // Initialize stats dashboard
    initStatsDashboard();
    
    // Initialize photo album
    initPhotoAlbum();
    
    // Initialize AI assistant
    initAIAssistant();
});

// Particle Canvas Background
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Skill Tree Animations
function initSkillTree() {
    const skillNodes = document.querySelectorAll('.skill-node');
    
    // Animate skill nodes on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'skillNodeAppear 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    skillNodes.forEach(node => {
        node.style.opacity = '0';
        observer.observe(node);
        
        // Add hover effects
        node.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 245, 255, 0.3)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // Add click effects for skill details
        node.addEventListener('click', function() {
            const skillName = this.dataset.skill;
            showSkillModal(skillName);
        });
    });
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.transition = 'width 2s ease-out';
                    entry.target.style.width = width;
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
}

// Achievement Badges Animation
function initAchievementBadges() {
    const badges = document.querySelectorAll('.achievement-badge');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'badgeUnlock 0.8s ease-out forwards';
                    entry.target.style.opacity = '1';
                    
                    // Add glow effect based on rarity
                    const rarity = entry.target.classList[1];
                    entry.target.style.boxShadow = getBadgeGlow(rarity);
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    badges.forEach(badge => {
        badge.style.opacity = '0';
        observer.observe(badge);
        
        // Hover effects
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function getBadgeGlow(rarity) {
    const glows = {
        'legendary': '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4)',
        'epic': '0 0 20px rgba(138, 43, 226, 0.6), 0 0 40px rgba(138, 43, 226, 0.4)',
        'rare': '0 0 15px rgba(0, 191, 255, 0.6), 0 0 30px rgba(0, 191, 255, 0.4)',
        'common': '0 0 10px rgba(128, 128, 128, 0.6), 0 0 20px rgba(128, 128, 128, 0.4)'
    };
    return glows[rarity] || glows.common;
}

// Certificate Gallery
function initCertificateGallery() {
    const certificates = document.querySelectorAll('.certificate-card');
    
    certificates.forEach(cert => {
        cert.addEventListener('click', function() {
            const img = this.querySelector('img');
            openImageModal(img.src, img.alt);
        });
        
        // Hover effects
        cert.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.querySelector('.certificate-overlay').style.opacity = '1';
        });
        
        cert.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.querySelector('.certificate-overlay').style.opacity = '0';
        });
    });
}

// Stats Dashboard Animation
function initStatsDashboard() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStatNumbers();
                animated = true;
            }
        });
    }, { threshold: 0.5 });
    
    if (statNumbers.length > 0) {
        observer.observe(statNumbers[0].closest('.stats-dashboard'));
    }
    
    function animateStatNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 30);
        });
    }
}

// Photo Album with 3D Flip Cards
function initPhotoAlbum() {
    const photoCards = document.querySelectorAll('.photo-card');
    const filterButtons = document.querySelectorAll('.album-filters .filter-btn');
    
    // Photo card flip functionality
    photoCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter photos
            photoCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Animate cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    photoCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// AI Assistant Widget
function initAIAssistant() {
    const aiToggle = document.getElementById('aiToggle');
    const aiChat = document.getElementById('aiChat');
    const aiClose = document.getElementById('aiClose');
    const aiInput = document.getElementById('aiInput');
    const aiSend = document.getElementById('aiSend');
    const aiMessages = document.getElementById('aiMessages');
    
    if (!aiToggle) return;
    
    // Toggle chat
    aiToggle.addEventListener('click', () => {
        aiChat.classList.add('active');
    });
    
    aiClose.addEventListener('click', () => {
        aiChat.classList.remove('active');
    });
    
    // Send message
    function sendMessage() {
        const message = aiInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        aiInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const response = getAIResponse(message);
            addMessage(response, 'ai');
        }, 1000);
    }
    
    aiSend.addEventListener('click', sendMessage);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${sender}`;
        
        if (sender === 'ai') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${text}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content user-message">
                    <p>${text}</p>
                </div>
            `;
        }
        
        aiMessages.appendChild(messageDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }
    
    function getAIResponse(message) {
        const responses = {
            'skills': 'I specialize in AI & Machine Learning (85% mastery), Full-Stack Development (90% mastery), and Cloud & DevOps (75% mastery). My strongest skills include Python, TensorFlow, JavaScript, React, and AWS.',
            'projects': 'I have 26+ projects including an AI Research Platform, Oil Palm Detection System with 92% accuracy, Cloud Computing Solutions, and E-Commerce platforms. Check out my mini-games too!',
            'experience': 'I\'m currently a Full-time AI Researcher at a Top 30 university, previously worked as an AI Software Intern at Aonic Sdn. Bhd., and I\'m pursuing a BSc Software Engineering double degree.',
            'achievements': 'I have legendary achievements like AI Research Master, epic badges for Double Degree Scholar and Computer Vision Expert, plus rare achievements in project leadership and discipline.',
            'certificates': 'My certificate wall includes BSc Software Engineering (APU/DMU), AI Research Position, Diploma in IT (TAR UMT), internship certificates, leadership awards, and technical certifications.',
            'games': 'Try my mini-games! I have Tic-Tac-Toe AI (unbeatable), Speed Typing Test, and Memory Game. They showcase my programming skills and creativity.',
            'default': 'I can help you learn about Howell\'s skills, projects, experience, achievements, certificates, or games. What would you like to know more about?'
        };
        
        const lowerMessage = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        return responses.default;
    }
}

// Modal Functions
function showSkillModal(skillName) {
    const skillData = {
        'Python': {
            level: 9,
            description: 'Advanced Python programming for AI, web development, and data analysis.',
            projects: ['AI Research Platform', 'Oil Palm Detection', 'Data Analytics'],
            certifications: ['Python Professional', 'Data Science Specialist']
        },
        'TensorFlow': {
            level: 8,
            description: 'Deep learning and neural network development using TensorFlow.',
            projects: ['Computer Vision Systems', 'ML Pipelines', 'AI Models'],
            certifications: ['TensorFlow Developer', 'ML Engineer']
        }
        // Add more skills as needed
    };
    
    const skill = skillData[skillName];
    if (!skill) return;
    
    // Create and show modal (implementation depends on your modal system)
    console.log(`Skill: ${skillName}`, skill);
}

function openImageModal(src, alt) {
    // Create modal for image viewing
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <img src="${src}" alt="${alt}">
                <button class="modal-close">&times;</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            document.body.removeChild(modal);
        }
    });
}

// CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes skillNodeAppear {
        from {
            opacity: 0;
            transform: scale(0.5) rotate(-180deg);
        }
        to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
    }
    
    @keyframes badgeUnlock {
        0% {
            opacity: 0;
            transform: scale(0.3) rotateY(-180deg);
        }
        50% {
            transform: scale(1.1) rotateY(-90deg);
        }
        100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .photo-card {
        perspective: 1000px;
        transition: all 0.3s ease;
    }
    
    .photo-card.flipped .photo-front {
        transform: rotateY(-180deg);
    }
    
    .photo-card.flipped .photo-back {
        transform: rotateY(0deg);
    }
    
    .photo-front, .photo-back {
        transition: transform 0.6s ease;
        backface-visibility: hidden;
    }
    
    .photo-back {
        transform: rotateY(180deg);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .skill-node, .achievement-badge, .certificate-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    
    .image-modal .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .image-modal img {
        width: 100%;
        height: auto;
        border-radius: 8px;
    }
    
    .modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
`;
document.head.appendChild(style);