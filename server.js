const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const { OpenAI } = require('openai');
const path = require('path');

const app = express();
const port = 3000;

// Create an instance of the OpenAI client
const openai = new OpenAI({
	apiKey: 'API_KEY', // Replace with your OpenAI API key
});

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware to allow cross-origin requests
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle chat requests
app.post('/chat', async (req, res) => {
	const userMessage = req.body.message;

	try {
		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-mini', // You can use other models as needed
			messages: [{ role: 'user', content: userMessage }],
		});

		const aiReply = completion.choices[0].message.content;
		res.json({ reply: aiReply });
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Internal Server Error');
	}
});

// Serve the HTML file
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
