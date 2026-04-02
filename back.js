/**
 * Romantic Interactions for Rang X Neang 💕
 * Beautiful JavaScript enhancements for the love page
 */

// Current language state
let currentLanguage = 'en';

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
        chinese: '我爱你，我的女孩 ❤',
        emoji: '💕'
    },
    {
        english: 'You make my heart skip a beat! 💓',
        khmer: 'អូននាងធ្វើឱ្យបេះដូងបងលោតខ្លាំងណាស់! 💓',
        chinese: '你让我心跳加速！💓',
        emoji: '🌹'
    },
    {
        english: 'My Dearest Rang X Neang',
        khmer: 'រាង ហ្សឹង នាង',
        chinese: '我最亲爱的Rang X Neang',
        emoji: '💕'
    },
    {
        english: 'My Beautiful O Neang',
        khmer: 'អូននាងស្រស់ស្អាតរបស់បង',
        chinese: '我美丽的女孩',
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
    setupLanguageSwitcher();
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
    const hoursDiff = Math.floor(timeDiff / (1000 * 3600));
    const daysDiff = Math.floor(hoursDiff / 24);
    const remainingHours = hoursDiff % 24;

    const counterElement = document.getElementById('daysTogether');
    if (counterElement) {
        if (daysDiff >= 0) {
            counterElement.textContent = `${daysDiff} days ${remainingHours} hours of love and counting! 💕`;
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
        left: `${x}px`,
        top: `${y}px`,
        fontSize: `${CONFIG.HEART_SIZE}px`,
    });

    heart.textContent = getRandomHeartEmoji();
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

function getLocaleText(message) {
    if (currentLanguage === 'km') {
        return {
            title: message.khmershort || message.khmer || message.english,
            sub: message.english
        };
    } else if (currentLanguage === 'zh') {
        return {
            title: message.chinese || message.english,
            sub: message.english
        };
    }

    return {
        title: message.english || message.khmershort || message.khmer,
        sub: message.khmer
    };
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
    const text = getLocaleText(message);

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span class="close-btn" aria-label="Close modal">&times;</span>
            </div>
            <div class="modal-body">
                <div class="heart-icon">${message.emoji}</div>
                <h3>${text.title}</h3>
                <p>${text.sub || ''}</p>
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
        body.classList.remove('theme-default', 'theme-pastel', 'theme-rose', 'theme-dark');
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

function setupLanguageSwitcher() {
    const textMap = {
        en: {
            title: '💕 Rang X Neang 💕',
            subtitle: 'My Beautiful Girlfriend',
            anniversaryHeader: '💍 Together since May 25, 2025 💍',
            anniversaryCountdownPast: (days, hours) => `${days} days ${hours} hours of love and counting! 💕`,
            anniversaryCountdownFuture: 'Our special day is coming soon! 🎉',
            navLinks: ['📸 Photos', '🎥 Videos', '💌 Messages', '📅 Timeline'],
            sectionTitles: ['🌸 Our Beautiful Memories 🌸', '🎥 Our Precious Moments 🎥', '💌 Love Messages 💌', '📅 Our Love Story 📅'],
            loveMessages: [
                {
                    title: '💕 My Dearest Rang X Neang 💕',
                    body: 'Every moment with you is a treasure. Your smile lights up my world, and your love fills my heart with joy. You are my everything, my love, my life. Forever yours! 💖',
                    date: 'March 26, 2026'
                },
                {
                    title: '🌹 My Beautiful O Neang 🌹',
                    body: 'You make my heart skip a beat every time I see you. Your laughter is my favorite melody, and your touch is my greatest comfort. I love you more than words can express! 💓',
                    date: 'Every day'
                }
            ],
            timeline: [
                { title: '🌟 The Day We Met 🌟', desc: 'The moment our eyes met, I knew you were special. That smile that captured my heart forever! 💕', date: 'First Meeting' },
                { title: '💍 Our Love Began 💍', desc: 'The magical day when our hearts connected forever. 25/05/2025 - the day we fell in love! 💖✨', date: '25 May 2025' },
                { title: '💑 Our First Date 💑', desc: 'A magical evening filled with laughter, conversation, and the beginning of something beautiful! 🌹', date: 'First Date' },
                { title: '💍 Forever Together 💍', desc: 'Every day with you is a blessing. You are my love, my life, my everything! 💖', date: 'Today & Always' }
            ],
            footer: 'Made with ❤️ for my dearest',
            modalMessage: '💌 Click a message card for a surprise 💌'
        },
        km: {
            title: '💕 រាំង X នាង 💕',
            subtitle: 'ស្រីស្អាតរបស់ខ្ញុំ',
            anniversaryHeader: '💍 រួមគ្នាជាមួយគ្នាតាំងពី ២៥ ឧសភា ២០២៥ 💍',
            anniversaryCountdownPast: (days, hours) => `ជាមួយគ្នា​មករួច ${days} ថ្ងៃ ${hours} ម៉ោង និងបន្តរាប់! 💕`,
            anniversaryCountdownFuture: 'ថ្ងៃពិសេសរបស់យើងកំពុងមកដល់! 🎉',
            navLinks: ['📸 រូបភាព', '🎥 វីដេអូ', '💌 សារ​ស្រលាញ់', '📅 រឿងស្នេហា'],
            sectionTitles: ['🌸 ចងចាំស្រស់ស្អាតរបស់យើង 🌸', '🎥 ខ្សែភាពយន្តតម្លៃមានរបស់យើង 🎥', '💌 សារ​ស្រលាញ់ 💌', '📅 រឿងស្រឡាញ់របស់យើង 📅'],
            loveMessages: [
                {
                    title: '💕 សួស្តី រាំង X នាង 💕',
                    body: 'រាល់ពេលវេលាជាមួយអ្នកគឺជាមោទនភាព។ ស្មារតីអ្នកបំភ្លឺពិភពលោករបស់ខ្ញុំ ហើយស្នាមញញឹមរបស់អ្នកពេញខ្ញុំនូវភាពរីករាយ។ អ្នកគឺជាគ្រប់យ៉ាងរបស់ខ្ញុំ! 💖',
                    date: '២៦ មីនា ២០២៦'
                },
                {
                    title: '🌹 អូននាងស្រស់ស្អាតរបស់បង 🌹',
                    body: 'អូនធ្វើឱ្យបេះដូងបងលោតរាល់ពេលដែលបានឃើញ។ ពេលហ្នឹងសប្បាយបំផុតរបស់ខ្ញុំ ហើយការរួមប៉ះរបស់អ្នកគឺជាសុខចិត្តដ៏អស្ចារ្យ។ 💓',
                    date: 'រាល់ថ្ងៃ'
                }
            ],
            timeline: [
                { title: '🌟 ថ្ងៃដែលយើងជួបគ្នា 🌟', desc: 'ពេលដែលភ្នែកយើងបានជួបគ្នា ខ្ញុំដឹងថាអ្នកពិសេសហើយ។ នេះជាស្នាមញញឹមដែលយកចិត្តទុកដាក់ខ្ញុំជានិច្ច! 💕', date: 'ការជួបគ្នា កាលពីដំបូង' },
                { title: '💍 ស្នេហារបស់យើងចាប់ផ្តើម 💍', desc: 'ថ្ងៃអស្ចារ្យដែលចិត្តយើងភ្ជាប់ព្រមគ្នាតាំងក្នុងមួយ។ ២៥/០៥/២០២៥ - ថ្ងៃដែលយើងស្រឡាញ់គ្នា! 💖✨', date: '២៥ ឧសភា ២០២៥' },
                { title: '💑 ថ្ងៃដើមគូស្នេហា 💑', desc: 'រសៀលមួយដ៏អស្ចារ្យពោរពេញដោយកំហឹងនិងការផ្សព្វផ្សាយដែលចាប់ផ្តើមអ្វីមួយស្រស់ស្អាត! 🌹', date: 'ថ្ងៃដើមជួបគ្នា' },
                { title: '💍 ទៅជាមួយគ្នា​រស់នៅ​សង្គម 💍', desc: 'រាល់ថ្ងៃទីជាមួយអ្នកជាការអរគុណ។ អ្នកគឺជាស្នេហារបស់ខ្ញុំ ជីវិតរបស់ខ្ញុំ! 💖', date: 'ថ្ងៃនេះ និងអស់កល្ប' }
            ],
            footer: 'បង្កើតដោយ ❤️ សម្រាប់អ្នកសំខាន់'
        },
        zh: {
            title: '💕 Rang X Neang 💕',
            subtitle: '我美丽的女孩',
            anniversaryHeader: '💍 自2025年5月25日起在一起 💍',
            anniversaryCountdownPast: (days, hours) => `我们在一起 ${days} 天 ${hours} 小时并继续计算！💕`,
            anniversaryCountdownFuture: '我们的特别日子快要来了！🎉',
            navLinks: ['📸 照片', '🎥 视频', '💌 留言', '📅 时间线'],
            sectionTitles: ['🌸 我们美丽的回忆 🌸', '🎥 我们珍贵的时刻 🎥', '💌 爱的信息 💌', '📅 我们的爱情故事 📅'],
            loveMessages: [
                {
                    title: '💕 我最亲爱的Rang X Neang 💕',
                    body: '和你在一起的每一刻都是宝藏。你的笑容照亮了我的世界，你的爱充满了我的心。你是我的一切，我的爱，我的生命。永远属于你！💖',
                    date: '2026年3月26日'
                },
                {
                    title: '🌹 我美丽的女孩 🌹',
                    body: '每次看到你，我的心都会跳动。你的笑声是我最喜欢的旋律，你的触摸是我最大的安慰。我爱你胜过言语所能表达！💓',
                    date: '每天'
                }
            ],
            timeline: [
                { title: '🌟 我们相遇的那天 🌟', desc: '我们的眼睛相遇的那一刻，我就知道你很特别。那笑容永远俘获了我的心！💕', date: '初次见面' },
                { title: '💍 我们的爱开始了 💍', desc: '我们的心永远连接在一起的神奇日子。2025/05/25 - 我们相爱的那一天！💖✨', date: '2025年5月25日' },
                { title: '💑 我们的第一次约会 💑', desc: '一个充满欢笑、对话和美丽开始的魔幻夜晚！🌹', date: '第一次约会' },
                { title: '💍 永远在一起 💍', desc: '和你在一起的每一天都是祝福。你是我的爱，我的生命，我的一切！💖', date: '今天和永远' }
            ],
            footer: '用 ❤️ 为我最亲爱的人制作'
        }
    };

    const langButtons = document.querySelectorAll('.lang-btn');
    const savedLang = localStorage.getItem('lovePageLanguage') || 'en';

    function applyLanguage(lang) {
        currentLanguage = lang;
        const data = textMap[lang] || textMap.en;

        document.title = `${data.title} - ${lang === 'km' ? 'ស្នេហា' : lang === 'zh' ? '爱' : 'My Love'}`;
        document.querySelector('header h1').textContent = data.title;
        document.querySelector('.subtitle').textContent = data.subtitle;

        const counterFirstLine = document.querySelector('.anniversary-counter p:first-of-type');
        if (counterFirstLine) {
            counterFirstLine.textContent = data.anniversaryHeader;
        }

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, i) => {
            link.textContent = data.navLinks[i] || link.textContent;
        });

        document.querySelector('#photos h2').textContent = data.sectionTitles[0];
        document.querySelector('#videos h2').textContent = data.sectionTitles[1];
        document.querySelector('#messages h2').textContent = data.sectionTitles[2];
        document.querySelector('#timeline h2').textContent = data.sectionTitles[3];

        const messageCards = document.querySelectorAll('.love-message');
        messageCards.forEach((card, index) => {
            const title = card.querySelector('h3');
            const body = card.querySelector('p');
            const date = card.querySelector('.message-date');
            if (title) title.textContent = data.loveMessages[index]?.title || title.textContent;
            if (body) body.textContent = data.loveMessages[index]?.body || body.textContent;
            if (date) date.textContent = data.loveMessages[index]?.date || date.textContent;
        });

        const timelineItems = document.querySelectorAll('.timeline-item .timeline-content');
        timelineItems.forEach((item, index) => {
            const h3 = item.querySelector('h3');
            const p = item.querySelector('p');
            const span = item.querySelector('.timeline-date');
            if (h3) h3.textContent = data.timeline[index]?.title || h3.textContent;
            if (p) p.textContent = data.timeline[index]?.desc || p.textContent;
            if (span) span.textContent = data.timeline[index]?.date || span.textContent;
        });

        document.querySelector('footer p').textContent = data.footer;

        langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
        localStorage.setItem('lovePageLanguage', lang);

        const notificationText = lang === 'km' ? '🌏 ភាសាដែលបានកំណត់ជា ខ្មែរ' : lang === 'zh' ? '🌏 语言设置为中文' : '🌏 Language set to English';
        showNotification(notificationText);

        // Update anniversary counter text based on newly selected language
        const counterElement = document.getElementById('daysTogether');
        if (counterElement) {
            const anniversaryDate = new Date('2025-05-25');
            const today = new Date();
            const timeDiff = today.getTime() - anniversaryDate.getTime();
            const hoursDiff = Math.floor(timeDiff / (1000 * 3600));
            const daysDiff = Math.floor(hoursDiff / 24);
            const remainingHours = hoursDiff % 24;
            if (daysDiff >= 0) {
                counterElement.textContent = data.anniversaryCountdownPast(daysDiff, remainingHours);
            } else {
                counterElement.textContent = data.anniversaryCountdownFuture;
            }
        }
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });

    applyLanguage(savedLang);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', initializeRomanticFeatures);
