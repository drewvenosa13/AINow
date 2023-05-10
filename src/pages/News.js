import React from 'react';
import ArticleCard from '../components/ArticleCard';

const articles = [
  {
    title: 'Article 1',
    imageUrl: 'https://via.placeholder.com/150',
    summary: 'Summary of article 1'
  },
  {
    title: 'Article 2',
    imageUrl: 'https://via.placeholder.com/150',
    summary: 'Summary of article 2'
  },
  // Add more articles here
];

const News = () => {
  return (
    <div className="news-page">
      <h1>News</h1>
      <p>Latest news and updates on AI and its applications in various domains.</p>
      <div className="article-grid">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </div>
  );
};

export default News;
