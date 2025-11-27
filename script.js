// ===== Global State Management =====
const appState = {
    user: {
        name: '',
        location: '',
        experience: '',
        gardenType: ''
    },
    chatHistory: [],
    currentSeason: '',
    preferences: {}
};

const MAX_HISTORY = 20; // Store last 20 messages

// ===== DOM Elements =====
const welcomeScreen = document.getElementById('welcomeScreen');
const chatInterface = document.getElementById('chatInterface');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const startBtn = document.getElementById('startBtn');
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const toast = document.getElementById('toast');

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadUserPreferences(); 
});

function initializeApp() {
    // Set current season
    const month = new Date().getMonth();
    appState.currentSeason = seasonalInfo[month].season;
    document.getElementById('currentSeason').textContent = seasonalInfo[month].advice;
}

// ===== Event Listeners =====
function setupEventListeners() {
    startBtn.addEventListener('click', handleStart);
    sendBtn.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });
    menuBtn.addEventListener('click', () => sideMenu.classList.add('active'));
    closeMenuBtn.addEventListener('click', () => sideMenu.classList.remove('active'));

    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const topic = btn.dataset.topic;
            handleTopicClick(topic);
        });
    });

    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.dataset.question;
            userInput.value = question;
            handleSendMessage();
        });
    });

    document.getElementById('clearChatBtn').addEventListener('click', clearChat);
    document.getElementById('settingsBtn').addEventListener('click', showSettings);
}

// ===== User Onboarding =====
function handleStart() {
    const name = document.getElementById('userName').value.trim();
    const location = document.getElementById('userLocation').value.trim();
    const experience = document.getElementById('experienceLevel').value;
    const gardenType = document.getElementById('gardenType').value;

    if (!name || !location) {
        showToast('Please fill in your name and location!');
        return;
    }

    appState.user = { name, location, experience, gardenType };

    try {
        localStorage.setItem('userPreferences', JSON.stringify(appState.user));
    } catch (error) {
        console.error('Error saving preferences:', error);
    }

    document.getElementById('userNameDisplay').textContent = name;
    document.getElementById('locationDisplay').textContent = location;

    welcomeScreen.classList.add('hidden');
    chatInterface.classList.remove('hidden');

    setTimeout(() => {
        const welcomeMsg = `Hello ${name}! 🌱 I'm your Smart Farm Assistant. I can help you with gardening and farming questions tailored to your ${experience} level and ${gardenType} setup. What would you like to know about growing plants in ${location}?`;
        addMessage('bot', welcomeMsg);
    }, 500);
}

function loadUserPreferences() {
    try {
        const saved = localStorage.getItem('userPreferences');
        if (saved) {
            appState.user = JSON.parse(saved);
            document.getElementById('userNameDisplay').textContent = appState.user.name;
            document.getElementById('locationDisplay').textContent = appState.user.location;
            welcomeScreen.classList.add('hidden');
            chatInterface.classList.remove('hidden');

            // Load chat history
            loadChatHistory();

            // Welcome back message
            setTimeout(() => {
                addMessage('bot', `Welcome back, ${appState.user.name}! 🌱 How can I help with your ${appState.user.gardenType} today?`);
            }, 300);
        }
    } catch (error) {
        console.error('Error loading preferences:', error);
    }
}

function loadChatHistory() {
    try {
        const saved = localStorage.getItem('chatHistory');
        if (saved) {
            const history = JSON.parse(saved);
            history.forEach(msg => {
                addMessageToUI(msg.sender, msg.text);
            });
        }
    } catch (error) {
        console.error('Error loading history:', error);
    }
}

// ===== Message Handling =====
function handleSendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage('user', message);
    userInput.value = '';

    showLoading(true);

    setTimeout(() => {
        const response = generateResponse(message);
        showLoading(false);
        addMessage('bot', response);
    }, 1000);
}

function generateResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();

    // Check each topic for keyword matches
    for (const [topic, data] of Object.entries(farmingKnowledge)) {
        if (data.keywords.some(keyword => message.includes(keyword))) {
            // Check for specific pattern matches
            for (const response of data.responses) {
                if (response.pattern.test(userMessage)) {
                    return personalizeResponse(response.answer, topic);
                }
            }
            // Return general topic response if no specific match
            return personalizeResponse(data.general, topic);
        }
    }

    return getFallbackResponse(userMessage);
}

function personalizeResponse(response, topic) {
    let personalized = response;

    // Experience-based customization
    if (appState.user.experience === 'beginner') {
        personalized += '\n\n💡 Beginner Tip: Start small and don\'t be afraid to make mistakes - every gardener learns by doing!';
    } else if (appState.user.experience === 'advanced') {
        personalized += '\n\n🌟 Advanced Note: Consider experimenting with companion planting or succession planting for better yields.';
    }

    // Garden type specific advice
    if (appState.user.gardenType === 'indoor' && (topic === 'vegetables' || topic === 'herbs')) {
        personalized += '\n\n🏠 Indoor Garden Tip: Focus on compact varieties and ensure adequate lighting (6-8 hours or grow lights).';
    } else if (appState.user.gardenType === 'urban') {
        personalized += '\n\n🌆 Urban Garden Tip: Container gardening and vertical growing are your best friends in limited spaces!';
    } else if (appState.user.gardenType === 'farm') {
        personalized += '\n\n🚜 Farm Scale Tip: Consider crop rotation and soil testing for sustainable long-term productivity.';
    }

    // Seasonal context
    const month = new Date().getMonth();
    const season = seasonalInfo[month].season;
    if (topic === 'seasons' || topic === 'vegetables') {
        personalized += `\n\n📅 ${season}: ${seasonalInfo[month].advice}`;
    }

    return personalized;
}

function getFallbackResponse(message) {
    const suggestions = Object.keys(farmingKnowledge).join(', ');

    const fallbacks = [
        `I'm not sure about that specific question. I can help with topics like: ${suggestions}. What would you like to know?`,
        `Interesting question! I specialize in gardening and farming. Try asking about planting schedules, soil care, pest control, or crop selection.`,
        `I'd love to help, but I need more details. Are you asking about vegetables, fruits, herbs, soil management, watering, pests, seasonal planting, or tools?`,
        `Great question, ${appState.user.name}! While I focus on gardening topics, I'd be happy to help with questions about growing crops in ${appState.user.location}. What specific plant or farming technique interests you?`
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function handleTopicClick(topic) {
    sideMenu.classList.remove('active');

    const topicInfo = farmingKnowledge[topic];
    if (topicInfo) {
        const personalizedInfo = personalizeResponse(topicInfo.general, topic);
        addMessage('bot', personalizedInfo);
    } else {
        showToast('Topic information not available');
    }
}

// ===== Message Display =====
function addMessage(sender, text) {
    addMessageToUI(sender, text);

    // Save to history
    appState.chatHistory.push({
        sender,
        text,
        timestamp: new Date().toISOString()
    });

    // Keep only recent messages
    if (appState.chatHistory.length > MAX_HISTORY) {
        appState.chatHistory = appState.chatHistory.slice(-MAX_HISTORY);
    }

    try {
        localStorage.setItem('chatHistory', JSON.stringify(appState.chatHistory));
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            // Storage full - keep only last 10 messages
            appState.chatHistory = appState.chatHistory.slice(-10);
            try {
                localStorage.setItem('chatHistory', JSON.stringify(appState.chatHistory));
            } catch (e) {
                console.error('Still cannot save:', e);
            }
        } else {
            console.error('Error saving history:', error);
        }
    }
}

function addMessageToUI(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${sender}`;

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;

    messageDiv.appendChild(bubbleDiv);
    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== Utility Functions =====
function showLoading(show) {
    if (show) {
        loadingIndicator.classList.remove('hidden');
    } else {
        loadingIndicator.classList.add('hidden');
    }
}

function showToast(message, duration = 3000) {
    toast.textContent = message;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, duration);
}

function clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        // Clear all messages safely
        while (chatMessages.firstChild) {
            chatMessages.removeChild(chatMessages.firstChild);
        }
        appState.chatHistory = [];

        try {
            localStorage.removeItem('chatHistory');
        } catch (error) {
            console.error('Error clearing history:', error);
        }

        showToast('Chat history cleared!');
        sideMenu.classList.remove('active');
    }
}

function showSettings() {
    const changeSettings = confirm('Would you like to update your profile information?');

    if (changeSettings) {
        // Clear current user data
        localStorage.removeItem('userPreferences');
        localStorage.removeItem('chatHistory');

        // Clear chat
        while (chatMessages.firstChild) {
            chatMessages.removeChild(chatMessages.firstChild);
        }

        // Show welcome screen again
        chatInterface.classList.add('hidden');
        welcomeScreen.classList.remove('hidden');

        // Reset form with current values
        document.getElementById('userName').value = appState.user.name;
        document.getElementById('userLocation').value = appState.user.location;
        document.getElementById('experienceLevel').value = appState.user.experience;
        document.getElementById('gardenType').value = appState.user.gardenType;

        showToast('Update your information and click "Start Growing!" again');
    }

    sideMenu.classList.remove('active');
}

// ===== Geolocation API Integration =====
function getLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // Determine hemisphere
                const hemisphere = lat >= 0 ? 'Northern' : 'Southern';

                // Determine climate zone (simplified)
                const absLat = Math.abs(lat);
                let zone;
                if (absLat <= 23.5) zone = 'Tropical';
                else if (absLat <= 35) zone = 'Subtropical';
                else if (absLat <= 50) zone = 'Temperate';
                else if (absLat <= 66.5) zone = 'Cold Temperate';
                else zone = 'Polar';

                showToast(`Detected ${zone} climate (${hemisphere} Hemisphere)`);

                // Save to preferences
                appState.user.climateZone = zone;
                appState.user.hemisphere = hemisphere;
                localStorage.setItem('userPreferences', JSON.stringify(appState.user));
            },
            (error) => {
                console.log('Location access denied:', error);
                showToast('Location access denied. Please enter your location manually.');
            }
        );
    } else {
        showToast('Geolocation not available in your browser');
    }
}

// ===== Date/Time Features =====
function getSeasonalReminder() {
    const month = new Date().getMonth();
    const seasonData = seasonalInfo[month];
    return `🌱 ${seasonData.season}: ${seasonData.advice}`;
}

// Display seasonal reminder periodically (optional feature)
function startSeasonalReminders() {
    const reminder = getSeasonalReminder();
    addMessage('bot', `📅 Seasonal Reminder: ${reminder}`);

    // Show reminder every 10 messages (example)
    if (appState.chatHistory.length % 10 === 0 && appState.chatHistory.length > 0) {
        setTimeout(() => {
            addMessage('bot', reminder);
        }, 2000);
    }
}

// ===== Calculator Tools =====
function calculateGardenSpace(length, width, plantSpacing) {
    const area = length * width;
    const plantsPerRow = Math.floor(width / plantSpacing);
    const numberOfRows = Math.floor(length / plantSpacing);
    const totalPlants = plantsPerRow * numberOfRows;
    const efficiency = (totalPlants * plantSpacing * plantSpacing) / area * 100;

    return {
        area: area.toFixed(1),
        totalPlants,
        plantsPerRow,
        numberOfRows,
        efficiency: efficiency.toFixed(1),
        recommendation: efficiency < 70 ?
            'Consider reducing plant spacing for better space utilization' :
            'Good space utilization!'
    };
}

// Expose calculator for potential use (could be triggered by keywords)
window.gardenCalculator = calculateGardenSpace;

// ===== Export for Testing =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateResponse,
        personalizeResponse,
        getFallbackResponse,
        calculateGardenSpace
    };
}
