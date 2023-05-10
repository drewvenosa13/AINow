import React from 'react';

const NewsPreview = ({ image, title }) => {
  return (
    <div className="news-preview">
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </div>
  );
};

export default NewsPreview;
