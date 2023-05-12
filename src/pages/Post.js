import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../services/postsService';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';
import Chatbot from '../components/Chatbot';

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getPostById(postId);
      setPost(fetchedPost);
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }
  const adminEmailsString = process.env.REACT_APP_ADMIN_EMAILS || '';
  const adminEmails = adminEmailsString.split(',');

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
      <Chatbot/>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      {post.updatedAt && <p>Last updated: {post.updatedAt.toLocaleString()}</p>}
      {currentUser && adminEmails.includes(currentUser.email) && (
        <Link to={`/edit-post/${postId}`}>
          <button>Edit Post</button>
        </Link>
      )}
    </div>
  );
};

export default Post;
