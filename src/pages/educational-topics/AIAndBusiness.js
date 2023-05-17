import React, { useEffect, useState } from 'react';
import ArticleCard from '../../components/ArticleCard.js';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../components/firebase.js';

const AIAndBusiness = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles from Firebase
    const articlesRef = collection(db, 'posts');
    const q = query(articlesRef, where("topic", "==", "ai-and-business"));

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
      <h1>AI and Business</h1>
      <p> Niggas catchin a bag off allis. </p>
      <div className="article-grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
};

export default AIAndBusiness;
