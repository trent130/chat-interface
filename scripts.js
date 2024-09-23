document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotBox = document.getElementById('chatbot-box');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    const botResponses = [
        'Thank you for your message. How can I assist you further?',
        'I appreciate your message! What do you need help with?',
        'I’m here to help! What’s your question?',
        'Thanks for reaching out! How may I assist you today?'
    ];

    chatbotToggle.addEventListener('click', function() {
        chatbotBox.classList.toggle('hidden');
    });

    chatbotClose.addEventListener('click', function() {
        chatbotBox.classList.add('hidden');
    });

    chatbotForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage('user', message);
            chatbotInput.value = '';
            addLoadingMessage();

            // Simulate a bot response after a short delay
            setTimeout(() => {
                removeLoadingMessage();
                const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                addMessage('bot', randomResponse);
            }, 1000);
        }
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addLoadingMessage() {
        const loadingElement = document.createElement('div');
        loadingElement.classList.add('message', 'bot', 'loading');
        loadingElement.textContent = '...';
        chatbotMessages.appendChild(loadingElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function removeLoadingMessage() {
        const loadingElement = chatbotMessages.querySelector('.loading');
        if (loadingElement) {
            loadingElement.remove();
        }
    }
});