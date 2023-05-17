import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../services/postsService';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { currentUser } = useAuth();

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
  const adminEmailsString = process.env.REACT_APP_ADMIN_EMAILS || '';
  const adminEmails = adminEmailsString.split(',');

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      {post.updatedAt && <p>Last updated: {(new Date(post.updatedAt.seconds * 1000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>}
      {currentUser && adminEmails.includes(currentUser.email) && (
        <Link to={`/edit-post/${postId}`}>
          <button>Edit Post</button>
        </Link>
      )}
    </div>
  );
};

export default Post;
