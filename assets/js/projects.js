// Projects page functionality - 2026 Dark Tech Theme with Mini Games
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle canvas
    initParticleCanvas();
    
    // Initialize project filtering
    initProjectFiltering();
    
    // Initialize mini games
    initMiniGames();
    
    // Initialize project animations
    initProjectAnimations();
    
    // Initialize AI assistant
    initAIAssistant();
});

// Particle Canvas Background
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
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
    
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
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

// Project Filtering
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || (category && category.includes(filter))) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Mini Games Implementation
function initMiniGames() {
    initTicTacToe();
    initTypingGame();
    initMemoryGame();
}

// Tic-Tac-Toe AI Game
let ticTacToeGame = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameActive: true,
    playerScore: 0,
    aiScore: 0
};

function initTicTacToe() {
    const cells = document.querySelectorAll('#ticTacToeBoard .game-cell');
    
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => makeMove(index));
    });
    
    updateScoreDisplay();
}

function makeMove(index) {
    if (ticTacToeGame.board[index] !== '' || !ticTacToeGame.gameActive) return;
    
    ticTacToeGame.board[index] = 'X';
    updateBoard();
    
    if (checkWinner()) {
        ticTacToeGame.playerScore++;
        updateScoreDisplay();
        setTimeout(() => alert('You won!'), 100);
        return;
    }
    
    if (ticTacToeGame.board.every(cell => cell !== '')) {
        setTimeout(() => alert('It\'s a tie!'), 100);
        return;
    }
    
    // AI move
    setTimeout(() => {
        const aiMove = getBestMove();
        ticTacToeGame.board[aiMove] = 'O';
        updateBoard();
        
        if (checkWinner()) {
            ticTacToeGame.aiScore++;
            updateScoreDisplay();
            setTimeout(() => alert('AI won!'), 100);
        }
    }, 500);
}

function getBestMove() {
    // Simple AI: try to win, block player, or take center/corner
    const winMove = findWinningMove('O');
    if (winMove !== -1) return winMove;
    
    const blockMove = findWinningMove('X');
    if (blockMove !== -1) return blockMove;
    
    const center = 4;
    if (ticTacToeGame.board[center] === '') return center;
    
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => ticTacToeGame.board[i] === '');
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    const availableMoves = ticTacToeGame.board.map((cell, i) => cell === '' ? i : null).filter(i => i !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function findWinningMove(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const line = [ticTacToeGame.board[a], ticTacToeGame.board[b], ticTacToeGame.board[c]];
        
        if (line.filter(cell => cell === player).length === 2 && line.includes('')) {
            return pattern[line.indexOf('')];
        }
    }
    return -1;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return ticTacToeGame.board[a] && 
               ticTacToeGame.board[a] === ticTacToeGame.board[b] && 
               ticTacToeGame.board[a] === ticTacToeGame.board[c];
    });
}

function updateBoard() {
    const cells = document.querySelectorAll('#ticTacToeBoard .game-cell');
    cells.forEach((cell, index) => {
        cell.textContent = ticTacToeGame.board[index];
        cell.className = `game-cell ${ticTacToeGame.board[index].toLowerCase()}`;
    });
}

function updateScoreDisplay() {
    const playerScoreEl = document.getElementById('playerScore');
    const aiScoreEl = document.getElementById('aiScore');
    if (playerScoreEl) playerScoreEl.textContent = ticTacToeGame.playerScore;
    if (aiScoreEl) aiScoreEl.textContent = ticTacToeGame.aiScore;
}

function resetTicTacToe() {
    ticTacToeGame.board = Array(9).fill('');
    ticTacToeGame.gameActive = true;
    updateBoard();
}

// Speed Typing Game
let typingGame = {
    texts: [
        "The quick brown fox jumps over the lazy dog.",
        "Programming is the art of telling another human what one wants the computer to do.",
        "Artificial intelligence is the future of technology and innovation.",
        "Code is like humor. When you have to explain it, it's bad.",
        "The best way to predict the future is to invent it."
    ],
    currentText: '',
    startTime: null,
    timeLimit: 60,
    timer: null,
    isActive: false
};

function initTypingGame() {
    const typingInput = document.getElementById('typingInput');
    if (!typingInput) return;
    
    typingInput.addEventListener('input', handleTypingInput);
}

function startTypingGame() {
    const textEl = document.getElementById('typingText');
    const inputEl = document.getElementById('typingInput');
    const timeEl = document.getElementById('timeStat');
    
    if (!textEl || !inputEl) return;
    
    typingGame.currentText = typingGame.texts[Math.floor(Math.random() * typingGame.texts.length)];
    textEl.textContent = typingGame.currentText;
    
    inputEl.value = '';
    inputEl.disabled = false;
    inputEl.focus();
    
    typingGame.startTime = Date.now();
    typingGame.isActive = true;
    
    typingGame.timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - typingGame.startTime) / 1000);
        const remaining = Math.max(0, typingGame.timeLimit - elapsed);
        timeEl.textContent = `${remaining}s`;
        
        if (remaining === 0) {
            endTypingGame();
        }
    }, 1000);
}

function handleTypingInput() {
    if (!typingGame.isActive) return;
    
    const inputEl = document.getElementById('typingInput');
    const typed = inputEl.value;
    const target = typingGame.currentText;
    
    // Calculate WPM and accuracy
    const elapsed = (Date.now() - typingGame.startTime) / 1000 / 60;
    const wordsTyped = typed.split(' ').length;
    const wpm = Math.round(wordsTyped / elapsed) || 0;
    
    let correctChars = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === target[i]) correctChars++;
    }
    const accuracy = typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;
    
    document.getElementById('wpmStat').textContent = wpm;
    document.getElementById('accuracyStat').textContent = `${accuracy}%`;
    
    // Check if completed
    if (typed === target) {
        endTypingGame();
        alert(`Completed! WPM: ${wpm}, Accuracy: ${accuracy}%`);
    }
}

function endTypingGame() {
    typingGame.isActive = false;
    clearInterval(typingGame.timer);
    document.getElementById('typingInput').disabled = true;
}

function resetTypingGame() {
    endTypingGame();
    document.getElementById('typingText').textContent = 'Click "Start Game" to begin the typing challenge!';
    document.getElementById('typingInput').value = '';
    document.getElementById('wpmStat').textContent = '0';
    document.getElementById('accuracyStat').textContent = '100%';
    document.getElementById('timeStat').textContent = '60s';
}

// Memory Game
let memoryGame = {
    cards: [],
    flippedCards: [],
    matches: 0,
    moves: 0,
    startTime: null,
    timer: null,
    symbols: ['🚀', '💻', '🤖', '⚡', '🔥', '💎', '🎯', '🌟']
};

function initMemoryGame() {
    startMemoryGame();
}

function startMemoryGame() {
    const gameEl = document.getElementById('memoryGame');
    if (!gameEl) return;
    
    // Reset game state
    memoryGame.flippedCards = [];
    memoryGame.matches = 0;
    memoryGame.moves = 0;
    memoryGame.startTime = Date.now();
    
    // Create card pairs
    const symbols = [...memoryGame.symbols, ...memoryGame.symbols];
    symbols.sort(() => Math.random() - 0.5);
    
    // Create cards HTML
    gameEl.innerHTML = symbols.map((symbol, index) => `
        <div class="memory-card" data-symbol="${symbol}" data-index="${index}">
            <div class="card-front">?</div>
            <div class="card-back">${symbol}</div>
        </div>
    `).join('');
    
    // Add click listeners
    document.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('click', flipCard);
    });
    
    // Start timer
    memoryGame.timer = setInterval(updateMemoryTimer, 1000);
    updateMemoryStats();
}

function flipCard() {
    if (this.classList.contains('flipped') || memoryGame.flippedCards.length >= 2) return;
    
    this.classList.add('flipped');
    memoryGame.flippedCards.push(this);
    
    if (memoryGame.flippedCards.length === 2) {
        memoryGame.moves++;
        updateMemoryStats();
        
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = memoryGame.flippedCards;
    const symbol1 = card1.dataset.symbol;
    const symbol2 = card2.dataset.symbol;
    
    if (symbol1 === symbol2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        memoryGame.matches++;
        
        if (memoryGame.matches === 8) {
            clearInterval(memoryGame.timer);
            setTimeout(() => alert('Congratulations! You won!'), 500);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    
    memoryGame.flippedCards = [];
    updateMemoryStats();
}

function updateMemoryTimer() {
    const elapsed = Math.floor((Date.now() - memoryGame.startTime) / 1000);
    document.getElementById('memoryTimeStat').textContent = `${elapsed}s`;
}

function updateMemoryStats() {
    document.getElementById('movesStat').textContent = memoryGame.moves;
    document.getElementById('matchesStat').textContent = `${memoryGame.matches}/8`;
}

// Project Animations
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
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
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 245, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Animate GitHub stats
    const statNumbers = document.querySelectorAll('.github-stats .stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
}

function animateNumber(element) {
    const finalValue = element.textContent;
    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
    const suffix = finalValue.replace(/\d/g, '');
    
    let currentValue = 0;
    const increment = numericValue / 50;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            element.textContent = finalValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue) + suffix;
        }
    }, 30);
}

// AI Assistant
function initAIAssistant() {
    const aiToggle = document.getElementById('aiToggle');
    const aiChat = document.getElementById('aiChat');
    const aiClose = document.getElementById('aiClose');
    const aiInput = document.getElementById('aiInput');
    const aiSend = document.getElementById('aiSend');
    const aiMessages = document.getElementById('aiMessages');
    
    if (!aiToggle) return;
    
    aiToggle.addEventListener('click', () => {
        aiChat.classList.add('active');
    });
    
    aiClose.addEventListener('click', () => {
        aiChat.classList.remove('active');
    });
    
    function sendMessage() {
        const message = aiInput.value.trim();
        if (!message) return;
        
        addMessage(message, 'user');
        aiInput.value = '';
        
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
            'projects': 'I have 26+ projects including AI Research Platform, Oil Palm Detection System (92% accuracy), Cloud Computing Solutions, E-Commerce platforms, Mobile Task Manager, and Data Analytics Dashboard. Each showcases different technical skills!',
            'games': 'Try my mini-games! Tic-Tac-Toe AI is unbeatable, Speed Typing Test challenges your WPM, and Memory Game tests your cognitive skills. They demonstrate my programming creativity!',
            'ai': 'My AI projects include the Research Platform with TensorFlow, Oil Palm Detection using computer vision, and various machine learning pipelines. I specialize in practical AI applications!',
            'web': 'My web projects include full-stack e-commerce platforms with React/Node.js, data analytics dashboards with D3.js, and responsive web applications with modern frameworks.',
            'mobile': 'I develop cross-platform mobile apps using React Native, with features like real-time sync, Firebase integration, and Redux state management.',
            'cloud': 'My cloud expertise includes AWS services, Docker containerization, Kubernetes orchestration, and Terraform infrastructure as code for scalable deployments.',
            'github': 'Check my GitHub stats: 26+ public repos, 50k+ lines of code, 15+ programming languages, and consistent daily contributions to open source projects!',
            'default': 'I can tell you about my projects (AI, web, mobile, cloud), mini-games (tic-tac-toe, typing, memory), GitHub statistics, or specific technologies. What interests you most?'
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

// Project Modal Functions
function openProjectModal(projectId) {
    const projectData = {
        'ai-research': {
            title: 'AI Research Platform',
            description: 'Advanced machine learning and neural network research platform with automated model training, data visualization, and performance analytics.',
            technologies: ['Python', 'TensorFlow', 'React', 'Docker', 'AWS'],
            features: ['Automated ML Pipelines', 'Real-time Visualization', 'Model Comparison', 'Performance Analytics'],
            github: 'https://github.com/Howell-Cho319',
            demo: '#'
        },
        'oil-palm': {
            title: 'Oil Palm Detection System',
            description: 'Real-time computer vision system for automated oil palm tree detection and counting with industry-leading accuracy.',
            technologies: ['OpenCV', 'PyTorch', 'YOLO', 'Flask', 'Python'],
            features: ['Real-time Detection', '92% Accuracy', '30fps Performance', 'Automated Counting'],
            github: 'https://github.com/Howell-Cho319',
            demo: '#'
        }
        // Add more project data as needed
    };
    
    const project = projectData[projectId];
    if (!project) return;
    
    // Create and show modal
    console.log(`Project: ${projectId}`, project);
    // Implementation depends on your modal system
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
        }
    }
    
    .project-card {
        transition: all 0.3s ease;
    }
    
    .tech-tag, .tech-tag-mini {
        transition: all 0.2s ease;
        cursor: pointer;
    }
    
    .status-badge.active {
        background: #4CAF50;
        color: white;
    }
    
    .status-badge.completed {
        background: #2196F3;
        color: white;
    }
`;
document.head.appendChild(style);

// CSS Animations and Styles
const style = document.createElement('style');
style.textContent = `
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
    
    /* Tic-Tac-Toe Styles */
    .tic-tac-toe-board {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2px;
        background: var(--accent-primary);
        border-radius: 8px;
        padding: 2px;
        margin: 1rem 0;
    }
    
    .game-cell {
        aspect-ratio: 1;
        background: var(--card-bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 6px;
    }
    
    .game-cell:hover {
        background: var(--card-bg-secondary);
        transform: scale(0.95);
    }
    
    .game-cell.x {
        color: var(--accent-primary);
    }
    
    .game-cell.o {
        color: var(--accent-secondary);
    }
    
    /* Memory Game Styles */
    .memory-game {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.5rem;
        margin: 1rem 0;
    }
    
    .memory-card {
        aspect-ratio: 1;
        position: relative;
        cursor: pointer;
        perspective: 1000px;
    }
    
    .card-front, .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        font-size: 1.5rem;
        font-weight: bold;
        transition: transform 0.6s ease;
        border: 2px solid var(--border-primary);
    }
    
    .card-front {
        background: var(--card-bg-primary);
        color: var(--text-secondary);
    }
    
    .card-back {
        background: var(--accent-primary);
        color: var(--bg-primary);
        transform: rotateY(180deg);
    }
    
    .memory-card.flipped .card-front {
        transform: rotateY(-180deg);
    }
    
    .memory-card.flipped .card-back {
        transform: rotateY(0deg);
    }
    
    .memory-card.matched .card-back {
        background: var(--accent-secondary);
        animation: matchPulse 0.6s ease;
    }
    
    @keyframes matchPulse {
        0%, 100% { transform: rotateY(0deg) scale(1); }
        50% { transform: rotateY(0deg) scale(1.1); }
    }
`;
document.head.appendChild(style);