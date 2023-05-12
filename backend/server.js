const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const OpenAI = require('openai');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const PSE_ID = process.env.PSE_ID;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const openai = new OpenAI(OPENAI_API_KEY);

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;

  // Check if the question is about a topic that may have newer information
  const keywords = ['2022', '2023', 'latest', 'recent', 'new'];
  const isNewerTopic = keywords.some((keyword) => question.toLowerCase().includes(keyword));

  if (isNewerTopic) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${PSE_ID}&q=${encodeURIComponent(question)}`
      );

      // Process the search results using ChatGPT
      const searchResults = response.data.items;
      const gpt3Prompt = `
Please provide a summary and cite the sources for the following Google Search results related to the question: "${question}"

Search Results:
${searchResults.map((result, index) => `${index + 1}. ${result.title} - ${result.link}`).join('\n')}
`;

      const gpt3Response = await openai.Completion.create({
        engine: 'davinci-codex',
        prompt: gpt3Prompt,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.5,
      });

      const answer = gpt3Response.choices[0].text.trim();
      res.json({ answer });

    } catch (error) {
      console.error('Error fetching Google Search results:', error);
      res.status(500).json({ error: 'Failed to fetch Google Search results' });
    }
  } else {
    // Fall back to using OpenAI API if no relevant results are found
    try {
      const gpt3Response = await openai.Completion.create({
        engine: 'davinci-codex',
        prompt: `I have a question about an article: ${question}`,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 0.5,
      });

      const answer = gpt3Response.choices[0].text.trim();
      res.json({ answer });
    } catch (error) {
      console.error('Error using OpenAI API:', error);
      res.status(500).json({ error: 'Failed to get a response from OpenAI API' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
