
document.getElementById('chat-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    appendMessage('user', userInput);
    document.getElementById('user-input').value = '';

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });

        if (!response.ok) {
            console.error('Server error:', response.statusText);
            appendMessage('bot', 'Sorry, there was a problem with the server.');
            return;
        }

        const data = await response.json();
        appendMessage('bot', data.reply);
    } catch (error) {
        console.error('Fetch error:', error);
        appendMessage('bot', 'Sorry, there was a problem connecting to the server.');
    }
});

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('mb-2', 'p-2', 'rounded-lg');
    if (sender === 'user') {
        messageElement.classList.add('bg-blue-100', 'text-right');
    } else {
        messageElement.classList.add('bg-green-100', 'text-left');
    }
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
