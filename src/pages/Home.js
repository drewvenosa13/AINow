import React from 'react';
import { Link } from 'react-router-dom';
import NewsPreview from '../components/NewsPreview';

const Home = () => {
  return (
    <div>
      <div className="welcome-section">
        <h1>Welcome to AI Now</h1>
      </div>
      <div className="news-section">
        <h2>Latest News</h2>
        <div className="news-row">
          <NewsPreview />
          <NewsPreview />
          <NewsPreview />
        </div>
        <div className="view-all-news">
          <Link to="/news">View All News</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
