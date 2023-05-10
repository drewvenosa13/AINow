import React from 'react';

const ArticleCard = ({ title, imageUrl, summary }) => {
  return (
    <div className="article-card">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{summary}</p>
    </div>
  );
};

export default ArticleCard;
