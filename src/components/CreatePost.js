import React, { useState } from "react";
import { collection, addDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
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
    intent: "News",
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
    const { title, content, topic, summary, imageURL, intent } = formData;
  
    // Generate the ID based on the title
    const id = title.toLowerCase().replace(/ /g, "-");  
  
    const docData = {
      id,
      title,
      content,
      topic,
      summary,
      intent,
      createdAt: serverTimestamp(),
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
          <option value="ethics">Ethics</option>
          <option value="cybersecurity">Cybersecurity</option>
          <option value="healthcare">Healthcare</option>
          <option value="beginners">Beginners</option>
          <option value="government">Government</option>
          <option value="business">Business</option>
          <option value="media">Media</option>
        </select>
        <br />
        <label>Intent:</label>
<select
  name="intent"
  value={formData.intent}
  onChange={handleInputChange}
  required
>
  <option value="News">News</option>
  <option value="Education">Education</option>
</select>
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