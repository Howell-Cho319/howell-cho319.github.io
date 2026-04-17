/* ===================================
   Main JavaScript - 2026 Dark Tech Theme
   Author: Howell Cho
   =================================== */

// ===== GLOBAL VARIABLES =====
let currentLang = 'en';
let typewriterIndex = 0;
let typewriterText = '';
let isDeleting = false;

// Multilingual content
const translations = {
    en: {
        'Hello, I\'m': 'Hello, I\'m',
        'Code • Create • Lead': 'Code • Create • Lead',
        'Enter Lab': 'Enter Lab',
        'View Portfolio': 'View Portfolio',
        'Download CV': 'Download CV',
        'Years Leadership': 'Years Leadership',
        'Projects': 'Projects',
        'Internships': 'Internships',
        'APU × DMU Double Degree': 'APU × DMU Double Degree',
        'BSc (Hons) Software Engineering': 'BSc (Hons) Software Engineering',
        'AI & Computer Vision': 'AI & Computer Vision',
        'Oil Palm Detection, Plant Disease Analysis': 'Oil Palm Detection, Plant Disease Analysis',
        'AWS Cloud Certified': 'AWS Cloud Certified',
        'Cloud Foundations, EC2, S3, Route53': 'Cloud Foundations, EC2, S3, Route53',
        '10+ Projects Delivered': '10+ Projects Delivered',
        'Full-Stack, AI/ML, Mobile Apps': 'Full-Stack, AI/ML, Mobile Apps',
        'Explore My World': 'Explore My World',
        'About Me': 'About Me',
        'My journey, education, and leadership experience': 'My journey, education, and leadership experience',
        'Portfolio': 'Portfolio',
        'Skills, certifications, and achievements showcase': 'Skills, certifications, and achievements showcase',
        'AI/ML, web development, and research projects': 'AI/ML, web development, and research projects',
        'Reach Me': 'Reach Me',
        'Let\'s collaborate on innovative projects': 'Let\'s collaborate on innovative projects',
        'Hi! I\'m Howell\'s AI assistant. Ask me anything!': 'Hi! I\'m Howell\'s AI assistant. Ask me anything!',
        'Who are you?': 'Who are you?',
        'What are your skills?': 'What are your skills?',
        'Show projects': 'Show projects',
        'Contact info': 'Contact info',
        'Download CV': 'Download CV'
    },
    my: {
        'Hello, I\'m': 'Halo, Saya',
        'Code • Create • Lead': 'Kod • Cipta • Pimpin',
        'Enter Lab': 'Masuk Lab',
        'View Portfolio': 'Lihat Portfolio',
        'Download CV': 'Muat Turun CV',
        'Years Leadership': 'Tahun Kepimpinan',
        'Projects': 'Projek',
        'Internships': 'Latihan Industri',
        'APU × DMU Double Degree': 'Ijazah Berganda APU × DMU',
        'BSc (Hons) Software Engineering': 'Sarjana Muda Kejuruteraan Perisian',
        'AI & Computer Vision': 'AI & Penglihatan Komputer',
        'Oil Palm Detection, Plant Disease Analysis': 'Pengesanan Kelapa Sawit, Analisis Penyakit Tumbuhan',
        'AWS Cloud Certified': 'Sijil AWS Cloud',
        'Cloud Foundations, EC2, S3, Route53': 'Asas Awan, EC2, S3, Route53',
        '10+ Projects Delivered': '10+ Projek Diselesaikan',
        'Full-Stack, AI/ML, Mobile Apps': 'Full-Stack, AI/ML, Aplikasi Mudah Alih',
        'Explore My World': 'Terokai Dunia Saya',
        'About Me': 'Tentang Saya',
        'My journey, education, and leadership experience': 'Perjalanan, pendidikan, dan pengalaman kepimpinan saya',
        'Portfolio': 'Portfolio',
        'Skills, certifications, and achievements showcase': 'Kemahiran, sijil, dan pencapaian',
        'AI/ML, web development, and research projects': 'AI/ML, pembangunan web, dan projek penyelidikan',
        'Reach Me': 'Hubungi Saya',
        'Let\'s collaborate on innovative projects': 'Mari bekerjasama dalam projek inovatif',
        'Hi! I\'m Howell\'s AI assistant. Ask me anything!': 'Hai! Saya pembantu AI Howell. Tanya apa sahaja!',
        'Who are you?': 'Siapa anda?',
        'What are your skills?': 'Apa kemahiran anda?',
        'Show projects': 'Tunjukkan projek',
        'Contact info': 'Maklumat hubungan',
        'Download CV': 'Muat turun CV'
    },
    cn: {
        'Hello, I\'m': '你好，我是',
        'Code • Create • Lead': '编程 • 创造 • 领导',
        'Enter Lab': '进入实验室',
        'View Portfolio': '查看作品集',
        'Download CV': '下载简历',
        'Years Leadership': '年领导经验',
        'Projects': '项目',
        'Internships': '实习',
        'APU × DMU Double Degree': 'APU × DMU 双学位',
        'BSc (Hons) Software Engineering': '软件工程学士学位',
        'AI & Computer Vision': '人工智能与计算机视觉',
        'Oil Palm Detection, Plant Disease Analysis': '油棕检测，植物病害分析',
        'AWS Cloud Certified': 'AWS 云认证',
        'Cloud Foundations, EC2, S3, Route53': '云基础，EC2，S3，Route53',
        '10+ Projects Delivered': '完成 10+ 项目',
        'Full-Stack, AI/ML, Mobile Apps': '全栈，AI/ML，移动应用',
        'Explore My World': '探索我的世界',
        'About Me': '关于我',
        'My journey, education, and leadership experience': '我的旅程、教育和领导经验',
        'Portfolio': '作品集',
        'Skills, certifications, and achievements showcase': '技能、认证和成就展示',
        'AI/ML, web development, and research projects': 'AI/ML、网页开发和研究项目',
        'Reach Me': '联系我',
        'Let\'s collaborate on innovative projects': '让我们在创新项目上合作',
        'Hi! I\'m Howell\'s AI assistant. Ask me anything!': '你好！我是 Howell 的 AI 助手。问我任何问题！',
        'Who are you?': '你是谁？',
        'What are your skills?': '你的技能是什么？',
        'Show projects': '显示项目',
        'Contact info': '联系信息',
        'Download CV': '下载简历'
    }
};

// Typewriter texts for different languages
const typewriterTexts = {
    en: ['AI Developer', 'Full-Stack Engineer', 'Project Leader', 'Tech Innovator'],
    my: ['Pembangun AI', 'Jurutera Full-Stack', 'Ketua Projek', 'Inovator Teknologi'],
    cn: ['AI 开发者', '全栈工程师', '项目负责人', '技术创新者']
};

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZE APP =====
function initializeApp() {
    initParticleCanvas();
    initNavigation();
    initTypewriter();
    initScrollAnimations();
    initLanguageSwitcher();
    initAIAssistant();
    initGlitchEffect();
    initSmoothScroll();
    
    // Add scroll listener for nav
    window.addEventListener('scroll', handleScroll);
    
    // Add resize listener for responsive adjustments
    window.addEventListener('resize', handleResize);
}

// ===== PARTICLE CANVAS =====
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
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
            
            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    function createParticles() {
        particles = [];
        const particleCount = Math.min(100, Math.floor(canvas.width * canvas.height / 15000));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Draw connections between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        
        animationId = requestAnimationFrame(animate);
    }
    
    createParticles();
    animate();
    
    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const texts = typewriterTexts[currentLang];
    let textIndex = 0;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            typewriterText = currentText.substring(0, typewriterIndex + 1);
            typewriterIndex++;
            
            if (typewriterIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeWriter, 2000); // Pause at end
                return;
            }
        } else {
            typewriterText = currentText.substring(0, typewriterIndex - 1);
            typewriterIndex--;
            
            if (typewriterIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }
        
        typewriterElement.textContent = typewriterText;
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, speed);
    }
    
    typeWriter();
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate counters
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe fade-in elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
    
    // Observe stat numbers
    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });
}

// ===== ANIMATE COUNTER =====
function animateCounter(element) {
    const target = parseFloat(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target % 1 === 0) {
            element.textContent = Math.floor(current);
        } else {
            element.textContent = current.toFixed(1);
        }
    }, 16);
}

// ===== LANGUAGE SWITCHER =====
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const newLang = this.dataset.lang;
            if (newLang !== currentLang) {
                switchLanguage(newLang);
            }
        });
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update text content
    document.querySelectorAll('[data-en]').forEach(element => {
        const key = element.dataset.en;
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Restart typewriter with new language
    typewriterIndex = 0;
    typewriterText = '';
    isDeleting = false;
}

// ===== AI ASSISTANT =====
function initAIAssistant() {
    const aiToggle = document.getElementById('aiToggle');
    const aiModal = document.getElementById('aiModal');
    const aiClose = document.getElementById('aiClose');
    const quickButtons = document.querySelectorAll('.quick-btn');
    
    if (!aiToggle || !aiModal) return;
    
    aiToggle.addEventListener('click', function() {
        aiModal.classList.toggle('active');
    });
    
    if (aiClose) {
        aiClose.addEventListener('click', function() {
            aiModal.classList.remove('active');
        });
    }
    
    // Quick action responses
    const responses = {
        about: {
            en: "I'm Howell Cho, a Software Engineering student at APU × DMU. I specialize in AI development, full-stack engineering, and project leadership. Currently working as an AI researcher focusing on computer vision and machine learning.",
            my: "Saya Howell Cho, pelajar Kejuruteraan Perisian di APU × DMU. Saya pakar dalam pembangunan AI, kejuruteraan full-stack, dan kepimpinan projek. Kini bekerja sebagai penyelidik AI yang fokus pada penglihatan komputer dan pembelajaran mesin.",
            cn: "我是 Howell Cho，APU × DMU 软件工程专业学生。我专注于 AI 开发、全栈工程和项目领导。目前担任 AI 研究员，专注于计算机视觉和机器学习。"
        },
        skills: {
            en: "My core skills include: Python, Java, JavaScript, AI/ML (TensorFlow, Computer Vision), Cloud Computing (AWS), Full-Stack Development, Project Leadership, and Research. I have 3+ years of leadership experience and have completed 10+ projects.",
            my: "Kemahiran teras saya termasuk: Python, Java, JavaScript, AI/ML (TensorFlow, Penglihatan Komputer), Pengkomputeran Awan (AWS), Pembangunan Full-Stack, Kepimpinan Projek, dan Penyelidikan. Saya mempunyai 3+ tahun pengalaman kepimpinan dan telah menyelesaikan 10+ projek.",
            cn: "我的核心技能包括：Python、Java、JavaScript、AI/ML（TensorFlow、计算机视觉）、云计算（AWS）、全栈开发、项目领导和研究。我有 3+ 年的领导经验，完成了 10+ 个项目。"
        },
        projects: {
            en: "Key projects: Oil Palm Detection System (AI/ML), Plant Disease Detection (Research), ActiveGearApp (Full-Stack E-commerce), APU Medical Centre App (Java), Flight Delay Prediction (Data Analysis), and AWS Cloud Solutions. Visit my Projects page for details!",
            my: "Projek utama: Sistem Pengesanan Kelapa Sawit (AI/ML), Pengesanan Penyakit Tumbuhan (Penyelidikan), ActiveGearApp (E-dagang Full-Stack), Aplikasi Pusat Perubatan APU (Java), Ramalan Kelewatan Penerbangan (Analisis Data), dan Penyelesaian Awan AWS. Lawati halaman Projek saya untuk butiran!",
            cn: "主要项目：油棕检测系统（AI/ML）、植物病害检测（研究）、ActiveGearApp（全栈电商）、APU 医疗中心应用（Java）、航班延误预测（数据分析）和 AWS 云解决方案。访问我的项目页面了解详情！"
        },
        contact: {
            en: "📧 Email: howell.cho319@gmail.com\n💼 LinkedIn: cho-sin-hong-9139a3378\n🐙 GitHub: github.com/ChoSinHong\n📱 Phone: 011-23347363\n📍 Location: Klang, Selangor, Malaysia",
            my: "📧 E-mel: howell.cho319@gmail.com\n💼 LinkedIn: cho-sin-hong-9139a3378\n🐙 GitHub: github.com/ChoSinHong\n📱 Telefon: 011-23347363\n📍 Lokasi: Klang, Selangor, Malaysia",
            cn: "📧 邮箱：howell.cho319@gmail.com\n💼 LinkedIn：cho-sin-hong-9139a3378\n🐙 GitHub：github.com/ChoSinHong\n📱 电话：011-23347363\n📍 位置：马来西亚雪兰莪巴生"
        },
        cv: {
            en: "You can download my CV by clicking the 'Download CV' button on the homepage, or visit my Resume page for a detailed online version. My CV includes my education, experience, projects, and certifications.",
            my: "Anda boleh memuat turun CV saya dengan mengklik butang 'Muat Turun CV' di halaman utama, atau lawati halaman Resume saya untuk versi dalam talian yang terperinci. CV saya termasuk pendidikan, pengalaman, projek, dan sijil saya.",
            cn: "您可以通过点击主页上的"下载简历"按钮下载我的简历，或访问我的简历页面查看详细的在线版本。我的简历包括我的教育、经验、项目和认证。"
        }
    };
    
    quickButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            const response = responses[action];
            
            if (response && response[currentLang]) {
                addAIMessage(response[currentLang]);
            }
        });
    });
}

function addAIMessage(message) {
    const aiContent = document.querySelector('.ai-content');
    if (!aiContent) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message bot-message';
    messageDiv.style.whiteSpace = 'pre-line';
    messageDiv.textContent = message;
    
    // Insert before quick actions
    const quickActions = aiContent.querySelector('.ai-quick-actions');
    aiContent.insertBefore(messageDiv, quickActions);
    
    // Scroll to bottom
    aiContent.scrollTop = aiContent.scrollHeight;
}

// ===== GLITCH EFFECT =====
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-effect');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        element.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ===== SCROLL HANDLER =====
function handleScroll() {
    const nav = document.querySelector('.nav-container');
    if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }
}

// ===== RESIZE HANDLER =====
function handleResize() {
    // Handle any responsive adjustments here
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debounced resize listener
window.addEventListener('resize', debounce(handleResize, 250));

// ===== PERFORMANCE OPTIMIZATIONS =====
// Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--duration-slow', '200ms');
    document.documentElement.style.setProperty('--duration-normal', '150ms');
    document.documentElement.style.setProperty('--duration-fast', '100ms');
}

// Pause animations when page is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});

console.log('🚀 Howell Cho Portfolio - 2026 Dark Tech Theme Loaded Successfully!');