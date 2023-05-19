import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';
import ArticleCard from './ArticleCard';

const NewsPreview = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'posts');
    const q = query(articlesRef, where("intent", "==", "news"), orderBy('createdAt', 'desc'), limit(3));

    onSnapshot(q, (snapshot) => {
      const articlesData = [];
      snapshot.forEach((doc) => {
        articlesData.push({ ...doc.data(), id: doc.id });
      });
      setArticles(articlesData);
    });
  }, []);

  return (
    <div className="news-preview">
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} isNewsPage={true} />
      ))}
    </div>
  );
};

export default NewsPreview;
