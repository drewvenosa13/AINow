import React, { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard.js';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase.js';
import { useParams } from 'react-router-dom';
import topics from './topics.json';

export const TopicPageWrapper = (props) => {

  const { topic } = useParams();

  // Find the topic details in your topics array
  const topicDetails = topics.find(t => t.name === topic);

  // If no matching topic is found, render some error message or a 404 page
  if (topicDetails!== undefined) {
    console.log('TopicPageWrapper topicDetails:', topicDetails)
  } else {
    console.log('Error: topic not found:', topic)
  }
  // Spread the topic details as props to the TopicPage component
  return <TopicPage {...topicDetails} {...props} />;
}; 
const TopicPage = ({ title, name, webcopy }) => { 
  const [newsArticles, setNewsArticles] = useState([]);
  const [educationArticles, setEducationArticles] = useState([]);
  const [currentIntent, setCurrentIntent] = useState('News'); // Default is News

  useEffect(() => {
    if (name) {  // Add this check
      console.log(name);
      const articlesRef = collection(db, 'posts');
      const newsQuery = query(articlesRef, where("topic", "==", name), where("intent", "==", "News"), orderBy('createdAt', 'desc'));
      const educationQuery = query(articlesRef, where("topic", "==", name), where("intent", "==", "Education"), orderBy('createdAt', 'desc'));
  
      onSnapshot(newsQuery, (snapshot) => {
        const articlesData = [];
        snapshot.forEach((doc) => {
          articlesData.push({ ...doc.data(), id: doc.id });
        });
        setNewsArticles(articlesData);
      });
  
      onSnapshot(educationQuery, (snapshot) => {
        const articlesData = [];
        snapshot.forEach((doc) => {
          articlesData.push({ ...doc.data(), id: doc.id });
        });
        setEducationArticles(articlesData);
      });
    }
  }, [name]);

  const handleIntentChange = (event) => {
    setCurrentIntent(event.target.value);
  }

  return (
    <div className={`${name}-page`}>
      <h1>{title}</h1>
      <p>{webcopy}</p>

      <div>
        <select onChange={handleIntentChange} value={currentIntent}>
          <option value="News">News</option>
          <option value="Education">Education</option>
        </select>
      </div>
      
      {currentIntent === 'News' && (
        <div>
          <h2>News</h2>
          <div className="article-grid">
            {newsArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      )}

      {currentIntent === 'Education' && (
        <div>
          <h2>Education</h2>
          <div className="article-grid">
            {educationArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

