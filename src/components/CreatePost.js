import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../components/firebase";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("AI Beginners");
  const [summary, setSummary] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const handleImageUpload = (e) => {
    setImageURL(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = title.replace(/\s+/g, "-").toLowerCase();
    const docData = {
      id,
      title,
      content,
      topic,
      summary,
      createdAt: new Date(),
      image: imageURL
    };
    console.log('Submitting data: ', docData)
    try {
      await addDoc(collection(db, "posts"), docData);
      setTitle("");
      setContent("");
      alert("Post successfully created.");
      setSubmitStatus(true);
    } catch (error) {
      alert("Error creating post: " + error.message);
    }
  };

  return (
    <div className="CreatePost">
      <h1>Create a Post</h1>
      {submitStatus && <p>Post submitted successfully!</p>} {/* <-- Add this line */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Image URL:</label>
        <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        value={imageURL}
        onChange={handleImageUpload}
        />
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label>Topic:</label>
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="AI Beginners">AI Beginners</option>
          <option value="AIAndMedia">AI and Media</option>
          <option value="AIAndGovernment">AI and Government</option>
          <option value="AIAndBusiness">AI and Business</option>
          <option value="News">News</option>
        </select>
        <br />
        <label>Summary:</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
