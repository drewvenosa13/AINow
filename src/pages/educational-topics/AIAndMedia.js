import React, { useEffect, useState } from 'react';
import ArticleCard from '../../components/ArticleCard.js';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../components/firebase.js';

const AIAndMedia = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [educationArticles, setEducationArticles] = useState([]);
  const [currentIntent, setCurrentIntent] = useState('News'); // Default is News

  useEffect(() => {
    const articlesRef = collection(db, 'posts');
    const newsQuery = query(articlesRef, where("topic", "==", "media"), where("intent", "==", "News"), orderBy('createdAt', 'desc'));
    const educationQuery = query(articlesRef, where("topic", "==", "media"), where("intent", "==", "Education"), orderBy('createdAt', 'desc'));

    onSnapshot(newsQuery, (snapshot) => {
      const articlesData = [];
      snapshot.forEach((doc) => {
        articlesData.push({ ...doc.data(), id: doc.id });
      });
      setNewsArticles(articlesData);
    });

    onSnapshot(educationQuery, (snapshot) => {
      const articlesData = [];
      snapshot.forEach((doc) => {
        articlesData.push({ ...doc.data(), id: doc.id });
      });
      setEducationArticles(articlesData);
    });
  }, []);

  const handleIntentChange = (event) => {
    setCurrentIntent(event.target.value);
  }

  return (
    <div className="media-page">
      <h1>AI and Media</h1>
      <p> Discussing the Implications of AI in Media </p>

      <div>
        <select onChange={handleIntentChange} value={currentIntent}>
          <option value="News">News</option>
          <option value="Education">Education</option>
        </select>
      </div>
      
      {currentIntent === 'News' && (
        <div>
          <h2>News</h2>
          <div className="article-grid">
            {newsArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      )}

      {currentIntent === 'Education' && (
        <div>
          <h2>Education</h2>
          <div className="article-grid">
            {educationArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAndMedia;
