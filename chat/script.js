document.addEventListener('DOMContentLoaded', () => {
	const messages = document.getElementById('messages');
	const userInput = document.getElementById('user-input');
	const sendButton = document.getElementById('send-button');

	function addMessage(text, fromUser = true) {
		const messageDiv = document.createElement('div');
		messageDiv.textContent = text;
		messageDiv.style.margin = '5px';
		messageDiv.style.padding = '10px';
		messageDiv.style.borderRadius = '5px';
		messageDiv.style.backgroundColor = fromUser ? '#007bff' : '#e5e5e5';
		messageDiv.style.color = fromUser ? 'white' : 'black';
		messages.appendChild(messageDiv);
		messages.scrollTop = messages.scrollHeight; // Scroll to the bottom
	}

	function handleUserInput() {
		const text = userInput.value.trim();
		if (text) {
			addMessage(text);
			userInput.value = '';

			// Simulate a chatbot response
			setTimeout(() => {
				const response = `You said: "${text}"`; // Simple echo response
				addMessage(response, false);
			}, 1000);
		}
	}

	sendButton.addEventListener('click', handleUserInput);

	userInput.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			handleUserInput();
		}
	});
});
