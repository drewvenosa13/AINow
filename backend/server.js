const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const openai = require('openai');
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert('C:/Users/drewv/Downloads/ai-now-79fbd-firebase-adminsdk-9m3pj-962e5d2df5.json'),
});
  
const db = admin.firestore();

const app = express();
const port = process.env.PORT || 5000;

openai.apiKey = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server is running.');
});

app.post('/api/generate-questions-answers', async (req, res) => {
    const { postContent } = req.body;
    try {
        const gpt3PromptForQuestions = `
        Please generate 25 questions based on the following content:
        ${postContent}
        `;

        const gpt3ResponseForQuestions = await openai.Completion.create({
            engine: 'davinci-codex',
            prompt: gpt3PromptForQuestions,
            max_tokens: 500,
            n: 1,
            stop: ["\n"],
        });

        const questions = gpt3ResponseForQuestions.choices[0].text.trim().split('\n');
        const answers = [];

        for (const question of questions) {
            const gpt3PromptForAnswers = `
            Based on the following content and your knowledge, answer the question: "${question}"
            ${postContent}
            `;

            const gpt3ResponseForAnswers = await openai.Completion.create({
            engine: 'davinci-codex',
            prompt: gpt3PromptForAnswers,
            max_tokens: 200,
            n: 1,
            stop: ["\n"],
            });

            let answer = gpt3ResponseForAnswers.choices[0].text.trim();

            if (answer.toLowerCase().includes("as an ai language model")) {
                const googleResponse = await axios.get(
                `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.PSE_ID}&q=${encodeURIComponent(question)}`
                );

// Let's get the top 10 results from Google search
                const topResults = googleResponse.data.items.slice(0, 10);
                const googlePrompts = topResults.map(result => `${result.title} - ${result.snippet}`);
                const googlePrompt = googlePrompts.join('\n');

                // Use OpenAI to analyze these results
                const openaiResponse = await openai.Completion.create({
                    engine: 'davinci-codex',
                    prompt: `Based on the following Google search results, answer the question: "${question}"\n\n${googlePrompt}`,
                    max_tokens: 200,
                    n: 1,
                    stop: ["\n"],
                });

                answer = `${openaiResponse.choices[0].text.trim()}\nLinks:\n${topResults.map(result => result.link).join('\n')}`;

            }

            answers.push(answer);
        }

        res.json({ questions, answers });
    } catch (error) {
        console.error('Error generating questions and answers:', error);
        res.status(500).json({ error: 'Failed to generate questions and answers' });
    }
});

app.post('/api/chat', async (req, res) => {
    try {
        const prompt = req.body.message;
        const response = await openai.Completion.create({
            engine: 'text-davinci-002',
            prompt: prompt,
            max_tokens: 60,
        });

        res.json({ answer: response.choices[0].text });
    } catch (error) {
        res.status(500).send('An error occurred while processing your request.');
        console.error(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
