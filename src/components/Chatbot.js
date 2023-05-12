import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = ({ postContent }) => {
  const [userQuestion, setUserQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [preGeneratedQuestions, setPreGeneratedQuestions] = useState([]);
  const [preGeneratedAnswers, setPreGeneratedAnswers] = useState([]);

  useEffect(() => {
    const fetchPreGeneratedQuestions = async () => {
      try {
        const response = await axios.post('/api/generate-questions', {
          postContent,
        });
        setPreGeneratedQuestions(response.data);
      } catch (error) {
        console.error('Error fetching pre-generated questions:', error);
      }
    };

    fetchPreGeneratedQuestions();
  }, [postContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { message: userQuestion, sender: 'user' },
    ]);

    const questionIndex = preGeneratedQuestions.indexOf(userQuestion);

    if (questionIndex !== -1 && preGeneratedAnswers[questionIndex]) {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        {
          message: preGeneratedAnswers[questionIndex],
          sender: 'chatbot',
        },
      ]);
    } else {
      try {
        const response = await axios.post('/api/chat', { message: userQuestion });
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { message: response.data.answer, sender: 'chatbot' },
        ]);
      } catch (error) {
        console.error('Error fetching chatbot answer:', error);
      }
    }

    setUserQuestion('');
  };

  return (
    <div className="chatbot-container">
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.sender}`}>
            {chat.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
