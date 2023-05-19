import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostById, deletePost } from '../services/postsService';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';
import Chatbot from '../components/Chatbot';

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { currentUser } = useAuth();
  const { navigate } = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(postId);
        console.log('Fetched post:', fetchedPost);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
  
    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  // format date to string
  const createdAtString = new Date(post.createdAt.seconds * 1000).toLocaleString();
  const updatedAtString = post.updatedAt ? new Date(post.updatedAt.seconds * 1000).toLocaleString() : null;

  const adminEmailsString = process.env.REACT_APP_ADMIN_EMAILS || '';
  const adminEmails = adminEmailsString.split(',');

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      navigate('/')
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };  

  return (
    <div>
      <h2>{post.title}</h2>
      {updatedAtString ? <p>Last updated: {updatedAtString}</p> : <p>Created at: {createdAtString}</p>}
      <p>{post.summary}</p>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      <Chatbot />
      {currentUser && adminEmails.includes(currentUser.email) && (
  <>
    <Link to={`/edit-post/${postId}`}>
      <button>Edit Post</button>
    </Link>
    <button onClick={handleDelete}>Delete Post</button>
  </>
)}

    </div>
  );
};

export default Post;
