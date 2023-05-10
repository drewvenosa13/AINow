import React from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../services/postsService';

const Post = () => {
  const { postId } = useParams();
  const post = getPostById(postId);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p>{post.createdAt}</p>
      <p>Topic(s): {post.topics.join(', ')}</p>
      <p>{post.summary}</p>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;
