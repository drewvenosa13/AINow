import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postsService.js";
import { getTopics } from "../services/topicsService";
import { AuthContext } from "../contexts/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [summary, setSummary] = useState("");
  const [topicId, setTopicId] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      const topics = await getTopics();
      setTopics(topics);
    };
    fetchTopics();
  }, []);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);
  const handleSummaryChange = (e) => setSummary(e.target.value);
  const handleTopicChange = (e) => setTopicId(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({
        title,
        image,
        summary,
        content,
        topicId,
        author: currentUser.email,
      });
      navigate("/news");
    } catch (error) {
      console.error(error);
    }
  };

  if (!currentUser || !["drewvenosa13@outlook.com", "josepholiverbiz@gmail.com"].includes(currentUser.email)) {
    return (
      <div className="CreatePost">
        <h1>Unauthorized Access</h1>
        <p>You must be logged in as an authorized user to access this page.</p>
      </div>
    );
  }

  return (
    <div className="CreatePost">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={handleTitleChange} required />
        <br />
        <label>Image URL:</label>
        <input type="text" value={image} onChange={handleImageChange} required />
        <br />
        <label>Summary:</label>
        <input type="text" value={summary} onChange={handleSummaryChange} required />
        <br />
        <label>Topic:</label>
        <select value={topicId} onChange={handleTopicChange} required>
          <option value="">-- Select a topic --</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        <br />
        <label>Content:</label>
        <textarea value={content} onChange={handleContentChange} required />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
