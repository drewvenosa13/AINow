import React, { useState } from 'react';
import openai from 'openai';

// Replace 'your_api_key' with your actual OpenAI API key
openai.api_key = process.env.REACT_APP_OPENAI_API_KEY;

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await openai.Completion.create({
      engine: 'text-davinci-002',
      prompt: `User: ${userInput}\nAI:`,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    if (result.choices && result.choices.length > 0) {
      setResponse(result.choices[0].text);
    } else {
      setResponse('Sorry, I could not understand your question.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask a question"
        />
        <button type="submit">Submit</button>
      </form>
      {response && <div>{response}</div>}
    </div>
  );
};

export default Chatbot;
