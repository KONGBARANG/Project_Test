// Romantic interactions for the beautiful page 💕

// Add click handlers to all images
document.querySelectorAll('img').forEach((img, index) => {
    img.addEventListener('click', () => {
        showLoveMessage(index);
        createHeartEffect(img);
    });
});

// Add click handler to video
const video = document.querySelector('video');
if (video) {
    video.addEventListener('play', () => {
        showNotification('🎥 Playing our precious memories...');
    });
}

// Love messages for each image
function showLoveMessage(index) {
    const messages = [
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

    const message = messages[index] || messages[0];

    // Create a beautiful modal instead of alert
    createLoveModal(message);
}

// Create heart effect on click
function createHeartEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createFloatingHeart(centerX, centerY);
        }, i * 100);
    }
}

// Create floating heart animation
function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '24px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = 'floatHeart 2s ease-out forwards';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Create beautiful love modal
function createLoveModal(message) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.love-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'love-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <div class="heart-icon">${message.emoji}</div>
                <h3>${message.english}</h3>
                <p>${message.khmer}</p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add close functionality
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
    });

    // Auto close after 3 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 3000);
}

// Show notification for video play
function showNotification(text) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = text;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 107, 157, 0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// Add some ambient effects
function addAmbientEffects() {
    // Add subtle floating hearts occasionally
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every 5 seconds
            const x = Math.random() * window.innerWidth;
            const y = window.innerHeight;
            createFloatingHeart(x, y);
        }
    }, 5000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    addAmbientEffects();
});
