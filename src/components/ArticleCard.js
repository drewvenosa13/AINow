import React from 'react';
import { NavLink } from 'react-router-dom';

const ArticleCard = ({ id, title, imageUrl, summary, topic, createdAt, updatedAt, isNewsPage }) => {
  // format date to string
  const createdAtString = new Date(createdAt.seconds * 1000).toLocaleString();
  const updatedAtString = updatedAt ? new Date(updatedAt.seconds * 1000).toLocaleString() : null;

  return (
    <NavLink to={`/${topic.toLowerCase()}/${id}`}>
      <div className="article-card">
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
        {isNewsPage && <p>Topic: {topic}</p>}
        <p>{summary}</p>
        <p>{updatedAtString ? `Last updated: ${updatedAtString}` : `Created at: ${createdAtString}`}</p>
      </div>
    </NavLink>
  );
};

export default ArticleCard;
