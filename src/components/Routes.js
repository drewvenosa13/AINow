import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from './Login';
import Register from './Register';
import News from '../pages/News';
import CreatePost from './CreatePost';
import AIForBeginners from '../pages/AIBeginners';
import AIAndGovernment from '../pages/educational-topics/AIAndGovernment';
import AIAndBusiness from '../pages/educational-topics/AIAndBusiness';
import AIAndMedia from '../pages/educational-topics/AIAndMedia';
import AIAndEthics from '../pages/educational-topics/AIAndEthics';
import AIAndHealthcare from '../pages/educational-topics/AIAndHealthcare';
import AIAndCybersecurity from '../pages/educational-topics/AIAndCybersecurity';
import Post from '../pages/Post';
import EditPost from './EditPost';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:postId" element={<Post />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/ai-for-beginners" element={<AIForBeginners />} />
      <Route path="/ai-for-beginners/:postId" element={<Post />} />
      <Route path="/government" element={<AIAndGovernment />} />
      <Route path="/government/:postId" element={<Post />} />
      <Route path="/business" element={<AIAndBusiness />} />
      <Route path="/business/:postId" element={<Post />} />
      <Route path="/media" element={<AIAndMedia />} />
      <Route path="/media/:postId" element={<Post />} />
      <Route path="/edit-post/:postId" element={<EditPost />} />
      <Route path="/ethics" element={<AIAndEthics />} />
      <Route path="/ethics/:postId" element={<Post />} />
      <Route path="/healthcare" element={<AIAndHealthcare />} />
      <Route path="/healthcare/:postId" element={<Post />} />
      <Route path="/cybersecurity" element={<AIAndCybersecurity />} />
      <Route path="/cybersecurity/:postId" element={<Post />} />
    </Routes>
  );
};

export default AppRoutes;
