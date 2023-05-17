import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../services/postsService';
import Quill from 'quill';
import './CreatePost.css'
import 'quill/dist/quill.snow.css'

const EditPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [topic, setTopic] = useState('');
  const quillRef = useRef(null);
  
  const initializeQuill = () => {
    if (quillRef.current === null) {
      quillRef.current = new Quill("#editor", {
        theme: "snow",
      });
      quillRef.current.on("text-change", function () {
        const content = quillRef.current.root.innerHTML;
        setContent(content);
      });
    }
  };

  useEffect(() => {
    initializeQuill();
  }, []); 

  useEffect(() => {
    if (content && quillRef.current != null) {
      const delta = quillRef.current.clipboard.convert(content);
      quillRef.current.setContents(delta, 'silent');
    }
  }, [content]);

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getPostById(postId);
      setPost(fetchedPost);
      setTitle(fetchedPost.title);
      setSummary(fetchedPost.summary);
      setContent(fetchedPost.content);
      setImage(fetchedPost.image);
      setTopic(fetchedPost.topic);
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

    try {
      await updatePost(postId, updatedPost);
      navigate(`/${topic.toLowerCase()}/${postId}`);
    } catch (error) {
      console.log(error);
    }
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
