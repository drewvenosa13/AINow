import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import News from '../pages/News';
import CreatePost from '../pages/admin/CreatePost';
import Post from '../pages/Post';
import EditPost from '../pages/admin/EditPost';
import {TopicPageWrapper} from '../pages/TopicPage'; // Assuming this is the component you use to render topic specific posts
import topics from '../pages/topics.json';

console.log(topics)

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:postId" element={<Post />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/edit-post/:postId" element={<EditPost />} />
      {topics.map((topic) => (
        <React.Fragment key={topic.name}>
          <Route path={`/${topic.name}`} element={<TopicPageWrapper />} />
          <Route path={`/${topic.name}/:postId`} element={<Post />} />
        </React.Fragment>
))}

    </Routes>
  );
};


export default AppRoutes;
