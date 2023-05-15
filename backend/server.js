// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const OpenAI = require('openai');
// const cheerio = require('cheerio');

// const app = express();
// const port = process.env.PORT || 5000;
// const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
// const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
// const PSE_ID = process.env.REACT_APP_PSE_ID;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const openai = new OpenAI(OPENAI_API_KEY);

// app.post('/api/ask', async (req, res) => {
//   const { question } = req.body;

//   try {
//     const response = await axios.get(
//       `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${PSE_ID}&q=${encodeURIComponent(question)}`
//     );

//     // Process the search results using ChatGPT
//     const searchResults = response.data.items;

//     // Scrape the full content of the websites
//     const websiteContents = await Promise.all(
//       searchResults.map(async (result) => {
//         try {
//           const pageResponse = await axios.get(result.link);
//           const $ = cheerio.load(pageResponse.data);
//           const content = $('body').text();
//           return content;
//         } catch (error) {
//           console.error('Error fetching website content:', error);
//           return 'Failed to fetch website content';
//         }
//       })
//     );

//     const gpt3Prompt = `
// Please provide a summary and cite the sources for the following Google Search results related to the question: "${question}"

// Search Results:
// ${searchResults
//   .map(
//     (result, index) =>
//       `${index + 1}. ${result.title} - ${result.link}\nSnippet: ${result.snippet}\nContent: ${websiteContents[index]}`
//   )
//   .join('\n\n')}
// `;

//     const gpt3Response = await openai.Completion.create({
//       engine: 'davinci-codex',
//       prompt: gpt3Prompt,
//       max_tokens: 150,
//       n: 1,
//       stop: null,
//       temperature: 0.5,
//     });

//     const answer = gpt3Response.choices[0].text.trim();
//     res.json({ answer });
//   } catch (error) {
//     console.error('Error fetching Google Search results:', error);
//     res.status(500).json({ error: 'Failed to fetch Google Search results' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
