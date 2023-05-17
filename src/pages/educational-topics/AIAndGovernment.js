import React, { useEffect, useState } from 'react';
import ArticleCard from '../../components/ArticleCard.js';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../components/firebase.js';

const AIAndGovernment = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles from Firebase
    const articlesRef = collection(db, 'posts');
    const q = query(articlesRef, where("topic", "==", "ai-and-government"));

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
    <div className="ai-government-page">
      <h1>AI And Government</h1>
      <p>Articles and resources about the dirty fuckin government. </p>
      <div className="article-grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
};

export default AIAndGovernment;
