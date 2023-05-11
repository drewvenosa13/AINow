import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../services/postsService';
import Quill from 'quill';
import './CreatePost.css'
import 'quill/dist/quill.snow.css'

const EditPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [topic, setTopic] = useState('');
  
  // Add this function after the useState declarations
  const initializeQuill = () => {
    const quill = new Quill("#editor", {
      theme: "snow",
    });

    quill.setContents(quill.clipboard.convert(content));

    quill.on("text-change", function () {
      const content = quill.root.innerHTML;
      setContent(content);
    });

    return quill;
  };

  // Add this useEffect hook
  useEffect(() => {
    if (content) {
      initializeQuill();
    }
  }, [content]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getPostById(postId);
      setPost(fetchedPost);
      setTitle(fetchedPost.title);
      setSummary(fetchedPost.summary);
      setContent(fetchedPost.content);
      setImage(fetchedPost.image);
      setTopic(fetchedPost.topic); // Set topic state variable
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      ...post,
      title,
      summary,
      content,
      image,
    };

    await updatePost(postId, updatedPost);
    navigate(`/${topic.toLowerCase()}/${postId}`);
  };
  
  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="summary">Summary</label>
          <input
            type="text"
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          {/* Replace the <textarea> element with this <div> */}
          <div id="editor" />
        </div>
        <div>
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
  export default EditPost;
  
