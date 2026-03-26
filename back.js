/**
 * Romantic Interactions for Rang X Neang 💕
 * Beautiful JavaScript enhancements for the love page
 */

// Configuration constants
const CONFIG = {
    HEART_COUNT: 8,
    HEART_DELAY: 100,
    HEART_SIZE: 24,
    MODAL_AUTO_CLOSE: 3000,
    HEART_FLOAT_DURATION: 2000,
    AMBIENT_HEART_CHANCE: 0.3,
    AMBIENT_HEART_INTERVAL: 3000,
    NOTIFICATION_DURATION: 2000,
    BACKGROUND_HEART_COUNT: 20,
    HEART_EMOJIS: ['💖', '💕', '💓', '💗', '💘', '💝', '💞']
};

// Love messages data
const LOVE_MESSAGES = [
    {
        english: 'Love you o neang ❤',
        khmer: 'បងស្រលាញ់អូននាងខ្លាំងៗ 🥰',
        emoji: '💕'
    },
    {
        english: 'You make my heart skip a beat! 💓',
        khmer: 'អូននាងធ្វើឱ្យបេះដូងបងលោតខ្លាំងណាស់! 💓',
        emoji: '🌹'
    },
    {
        english: 'My Dearest Rang X Neang',
        khmer: 'រាង ហ្សឹង នាង',
        emoji: '💕'
    },
    {
        english: 'My Beautiful O Neang',
        khmer: 'អូននាងស្រស់ស្អាតរបស់បង',
        emoji: '🌹'
    }
];

/**
 * Utility function to get a random heart emoji
 * @returns {string} Random heart emoji
 */
function getRandomHeartEmoji() {
    return CONFIG.HEART_EMOJIS[Math.floor(Math.random() * CONFIG.HEART_EMOJIS.length)];
}

/**
 * Utility function to create and style a DOM element
 * @param {string} tag - HTML tag name
 * @param {string} className - CSS class name
 * @param {Object} styles - Style properties object
 * @returns {HTMLElement} The created element
 */
function createStyledElement(tag, className, styles = {}) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    Object.assign(element.style, styles);
    return element;
}

/**
 * Initialize all romantic interactions when DOM is ready
 */
function initializeRomanticFeatures() {
    setupImageInteractions();
    setupVideoInteractions();
    setupNavigation();
    setupMessageInteractions();
    setupAnniversaryCounter();
    setupThemeSwitcher();
    createBackgroundHearts();
    startAmbientEffects();
}

/**
 * Setup click interactions for all images
 */
function setupImageInteractions() {
    document.querySelectorAll('img').forEach((img, index) => {
        img.addEventListener('click', (event) => {
            event.preventDefault();
            handleImageClick(img, index);
        });
    });
}

/**
 * Setup video play interactions
 */
function setupVideoInteractions() {
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('play', () => {
            showNotification('🎥 Playing our precious memories...');
        });
    });
}

/**
 * Setup navigation interactions
 */
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                showNotification('✨ Scrolling to ' + link.textContent + ' ✨');
            }
        });
    });
}

/**
 * Setup message interactions
 */
function setupMessageInteractions() {
    document.querySelectorAll('.love-message').forEach((message, index) => {
        message.addEventListener('click', () => {
            const messageData = LOVE_MESSAGES[index] || LOVE_MESSAGES[0];
            createLoveModal({
                ...messageData,
                english: message.querySelector('h3').textContent,
                khmer: message.querySelector('p').textContent
            });
        });
    });

    // Special anniversary interaction
    const anniversaryItem = document.querySelector('.timeline-item.anniversary');
    if (anniversaryItem) {
        anniversaryItem.addEventListener('click', () => {
            createLoveModal({
                english: 'Our Special Day - May 25, 2025',
                khmer: 'ថ្ងៃពិសេសរបស់យើង - ២៥ ឧសភា ២០២៥',
                emoji: '💍'
            });
        });
    }
}

/**
 * Setup anniversary counter
 */
function setupAnniversaryCounter() {
    const anniversaryDate = new Date('2025-05-25');
    const today = new Date();
    const timeDiff = today.getTime() - anniversaryDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    const counterElement = document.getElementById('daysTogether');
    if (counterElement) {
        if (daysDiff >= 0) {
            counterElement.textContent = `${daysDiff} days of love and counting! 💕`;
        } else {
            counterElement.textContent = `Our special day is coming soon! 🎉`;
        }
    }
}

/**
 * Handle image click - show message and create heart effect
 * @param {HTMLImageElement} imageElement - The clicked image
 * @param {number} index - Index of the image
 */
function handleImageClick(imageElement, index) {
    showLoveMessage(index);
    createHeartEffect(imageElement);
}

/**
 * Display love message in a beautiful modal
 * @param {number} index - Index of the message to show
 */
function showLoveMessage(index) {
    const message = LOVE_MESSAGES[index] || LOVE_MESSAGES[0];
    createLoveModal(message);
}

/**
 * Create floating heart effect at element position
 * @param {HTMLElement} element - Element to create effect around
 */
function createHeartEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create multiple hearts with staggered timing
    for (let i = 0; i < CONFIG.HEART_COUNT; i++) {
        setTimeout(() => {
            createFloatingHeart(centerX, centerY);
        }, i * CONFIG.HEART_DELAY);
    }
}

/**
 * Create and animate a single floating heart
 * @param {number} x - X position
 * @param {number} y - Y position
 */
function createFloatingHeart(x, y) {
    const heart = createStyledElement('div', 'floating-heart', {
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        fontSize: `${CONFIG.HEART_SIZE}px`,
        pointerEvents: 'none',
        zIndex: '1000',
        animation: 'floatHeart 2s ease-out forwards'
    });

    heart.innerHTML = '💖';
    document.body.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, CONFIG.HEART_FLOAT_DURATION);
}

/**
 * Create and display a beautiful love modal
 * @param {Object} message - Message object with english, khmer, and emoji
 */
function createLoveModal(message) {
    removeExistingModal();

    const modal = createModalElement(message);
    document.body.appendChild(modal);

    setupModalInteractions(modal);
    scheduleAutoClose(modal);
}

/**
 * Remove any existing modal
 */
function removeExistingModal() {
    const existingModal = document.querySelector('.love-modal');
    if (existingModal) {
        existingModal.remove();
    }
}

/**
 * Create the modal DOM element
 * @param {Object} message - Message object
 * @returns {HTMLElement} Modal element
 */
function createModalElement(message) {
    const modal = createStyledElement('div', 'love-modal');

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span class="close-btn" aria-label="Close modal">&times;</span>
            </div>
            <div class="modal-body">
                <div class="heart-icon">${message.emoji}</div>
                <h3>${message.english}</h3>
                <p>${message.khmer}</p>
            </div>
        </div>
    `;

    return modal;
}

/**
 * Setup modal interaction handlers
 * @param {HTMLElement} modal - Modal element
 */
function setupModalInteractions(modal) {
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => modal.remove());

    // Close on background click
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Schedule automatic modal closure
 * @param {HTMLElement} modal - Modal element
 */
function scheduleAutoClose(modal) {
    setTimeout(() => {
        if (modal && modal.parentNode) {
            modal.remove();
        }
    }, CONFIG.MODAL_AUTO_CLOSE);
}

/**
 * Show a temporary notification
 * @param {string} text - Notification text
 */
function showNotification(text) {
    const notification = createNotificationElement(text);
    document.body.appendChild(notification);
    scheduleNotificationRemoval(notification);
}

/**
 * Create notification DOM element
 * @param {string} text - Notification text
 * @returns {HTMLElement} Notification element
 */
function createNotificationElement(text) {
    const notification = createStyledElement('div', 'notification', {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(255, 107, 157, 0.9)',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '25px',
        fontWeight: 'bold',
        zIndex: '1000',
        animation: 'slideInRight 0.5s ease-out'
    });
    notification.textContent = text;
    return notification;
}

/**
 * Schedule notification removal with animation
 * @param {HTMLElement} notification - Notification element
 */
function scheduleNotificationRemoval(notification) {
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, CONFIG.NOTIFICATION_DURATION);
}

/**
 * Create animated background hearts
 */
function createBackgroundHearts() {
    const container = createStyledElement('div', 'background-hearts');
    document.body.appendChild(container);

    for (let i = 0; i < CONFIG.BACKGROUND_HEART_COUNT; i++) {
        const heart = createStyledElement('div', 'background-heart', {
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 10 + 's',
            animationDuration: (Math.random() * 10 + 10) + 's',
            fontSize: (Math.random() * 20 + 20) + 'px'
        });

        heart.innerHTML = getRandomHeartEmoji();
        container.appendChild(heart);
    }
}

/**
 * Start ambient background effects
 */
function startAmbientEffects() {
    setInterval(() => {
        if (Math.random() < CONFIG.AMBIENT_HEART_CHANCE) {
            createAmbientHeart();
        }
    }, CONFIG.AMBIENT_HEART_INTERVAL);
}

/**
 * Create a random ambient floating heart
 */
function createAmbientHeart() {
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight;
    createFloatingHeart(x, y);
}

/**
 * Setup background theme switcher
 */
function setupThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    const savedTheme = localStorage.getItem('lovePageTheme') || 'default';

    function applyTheme(theme) {
        body.classList.remove('theme-default', 'theme-pastel', 'theme-dark');
        body.classList.add(`theme-${theme}`);
        themeButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.theme === theme));
        localStorage.setItem('lovePageTheme', theme);
    }

    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            applyTheme(btn.dataset.theme);
            showNotification(`🎨 Theme changed to ${btn.dataset.theme}`);
        });
    });

    applyTheme(savedTheme);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', initializeRomanticFeatures);
