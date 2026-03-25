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
    AMBIENT_HEART_CHANCE: 0.1,
    AMBIENT_HEART_INTERVAL: 5000,
    NOTIFICATION_DURATION: 2000
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
    }
];

/**
 * Initialize all romantic interactions
 */
function initializeRomanticFeatures() {
    setupImageInteractions();
    setupVideoInteractions();
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
    const video = document.querySelector('video');
    if (video) {
        video.addEventListener('play', () => {
            showNotification('🎥 Playing our precious memories...');
        });
    }
}

/**
 * Handle image click - show message and create heart effect
 */
function handleImageClick(imageElement, index) {
    showLoveMessage(index);
    createHeartEffect(imageElement);
}

/**
 * Display love message in a beautiful modal
 */
function showLoveMessage(index) {
    const message = LOVE_MESSAGES[index] || LOVE_MESSAGES[0];
    createLoveModal(message);
}

/**
 * Create floating heart effect at element position
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
 */
function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.className = 'floating-heart';

    // Set initial position and styles
    Object.assign(heart.style, {
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        fontSize: `${CONFIG.HEART_SIZE}px`,
        pointerEvents: 'none',
        zIndex: '1000',
        animation: 'floatHeart 2s ease-out forwards'
    });

    document.body.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, CONFIG.HEART_FLOAT_DURATION);
}

/**
 * Create and display a beautiful love modal
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
 */
function createModalElement(message) {
    const modal = document.createElement('div');
    modal.className = 'love-modal';

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
 */
function scheduleAutoClose(modal) {
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, CONFIG.MODAL_AUTO_CLOSE);
}

/**
 * Show a temporary notification
 */
function showNotification(text) {
    const notification = createNotificationElement(text);
    document.body.appendChild(notification);

    scheduleNotificationRemoval(notification);
}

/**
 * Create notification DOM element
 */
function createNotificationElement(text) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = text;

    Object.assign(notification.style, {
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

    return notification;
}

/**
 * Schedule notification removal with animation
 */
function scheduleNotificationRemoval(notification) {
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => notification.remove(), 500);
    }, CONFIG.NOTIFICATION_DURATION);
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

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', initializeRomanticFeatures);
