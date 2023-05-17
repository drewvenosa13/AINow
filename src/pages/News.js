import React, { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../components/firebase';
import { query, where } from 'firebase/firestore';  // Import query and where

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'posts');
    const q = query(articlesRef, where("topic", "==", "news")); // Use where to filter by topic

    onSnapshot(q, (snapshot) => {
      const articlesData = [];
      snapshot.forEach((doc) => {
        articlesData.push({ ...doc.data(), id: doc.id });
      });
      articlesData.sort((a, b) => b.date - a.date);
      setArticles(articlesData);
    });
  }, []);

  return (
    <div className="news-page">
      <h1>News</h1>
      <p>Latest news and updates on AI and its applications in various domains.</p>
      <div className="article-grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
};

export default News;
