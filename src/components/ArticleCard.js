import React from 'react';
import { NavLink } from 'react-router-dom';

const ArticleCard = ({ id, title, imageUrl, summary, topic }) => {
  return (
    <NavLink to={`/${topic.toLowerCase()}/${id}`}>
      <div className="article-card">
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
        <p>{summary}</p>
      </div>
    </NavLink>
  );
};

export default ArticleCard;
