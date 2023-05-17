import React, { useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../components/firebase";
import { useNavigate } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    topic: "",
    summary: "",
    imageURL: "",
  });
  
  // Add this function after the useState declarations
  const initializeQuill = () => {
    const quill = new Quill("#editor", {
      theme: "snow",
    });

    quill.on("text-change", function () {
      const content = quill.root.innerHTML;
      setFormData((prevState) => ({ ...prevState, content }));
    });

    return quill;
  };

  // Add this useEffect hook
  React.useEffect(() => {
    initializeQuill();
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, content, topic, summary, imageURL } = formData;
  
    // Generate the ID based on the title
    const id = title.trim().toLowerCase().replace(/\s+/g, '-');
  
    const docData = {
      id,
      title,
      content,
      topic,
      summary,
      createdAt: new Date(),
      image: imageURL,
    };
  
    try {
      await setDoc(doc(db, "posts", id), docData);
      console.log("Data added to Firestore: ", docData);
      setFormData({
        title: "",
        content: "",
        topic: "",
        summary: "",
        imageURL: "",
      });
      navigate(`/${topic.toLowerCase()}/${docData.id}`);
      alert("Post successfully created.");
    } catch (error) {
      console.log("Error: ", error);
      alert("Error creating post: " + error.message);
    }
  };

  return (
    <div className="CreatePost">
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleInputChange}
        />
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Topic:</label>
        <select
          name="topic"
          value={formData.topic}
          onChange={handleInputChange}
          required
        >
          <option value="">Select topic</option>
          <option value="news">News</option>
          <option value="ai-for-beginners">AI For Beginners</option>
          <option value="ai-and-government">AI And Government</option>
          <option value="ai-and-business">AI And Business</option>
          <option value="ai-and-media">AI and Media</option>
        </select>
        <br />
        <label>Summary:</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleInputChange}
          required
        />
        <label>Content:</label>
        <div id="editor" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

  export default CreatePost;  