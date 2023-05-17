import React, { useEffect, useState } from 'react';
import ArticleCard from '../../components/ArticleCard.js';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../components/firebase.js';

const AIBeginners = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles from Firebase
    const articlesRef = collection(db, 'posts');
    const q = query(articlesRef, where("topic", "==", "ai-for-beginners"));

    onSnapshot(q, (snapshot) => {
      const articlesData = [];
      snapshot.forEach((doc) => {
        articlesData.push({ ...doc.data(), id: doc.id });
      });
      // Sort articles by date (newest first)
      articlesData.sort((a, b) => b.date - a.date);
      setArticles(articlesData);
    });
  }, []);

  return (
    <div className="ai-beginners-page">
      <h1>AI Beginners</h1>
      <p>Articles and resources for AI beginners.</p>
      <div className="article-grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
};

export default AIBeginners;
