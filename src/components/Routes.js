import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from './Login';
import Register from './Register';
import News from '../pages/News';
import CreatePost from './CreatePost';
import AIForBeginners from '../pages/educational-topics/AIBeginners';
import AIAndGovernment from '../pages/educational-topics/AIAndGovernment';
import AIAndBusiness from '../pages/educational-topics/AIAndBusiness';
import AIAndMedia from '../pages/educational-topics/AIAndMedia';
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
      <Route path="/ai-and-government" element={<AIAndGovernment />} />
      <Route path="/ai-and-government/:postId" element={<Post />} />
      <Route path="/ai-and-business" element={<AIAndBusiness />} />
      <Route path="/ai-and-business/:postId" element={<Post />} />
      <Route path="/ai-and-media" element={<AIAndMedia />} />
      <Route path="/ai-and-media/:postId" element={<Post />} />
      <Route path="/edit-post/:postId" element={<EditPost />} />
    </Routes>
  );
};

export default AppRoutes;
