import React, { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { collection, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../components/firebase';
import { query, where } from 'firebase/firestore';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'posts');
    const q = query(articlesRef, where("intent", "==", "News"), orderBy('createdAt', 'desc'));

    onSnapshot(q, (snapshot) => {
      const articlesData = [];
      snapshot.forEach((doc) => {
        articlesData.push({ ...doc.data(), id: doc.id });
      });
      setArticles(articlesData);
    });
  }, []);

  return (
    <div className="news-page">
      <h1>News</h1>
      <p>Latest news and updates on AI and its applications in various domains.</p>
      <div className="article-grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} isNewsPage={true} />
        ))}
      </div>
    </div>
  );
};

export default News;
