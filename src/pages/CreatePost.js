import React, { useState } from "react";
import { collection, addDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "../axiosConfig";


const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    topic: "",
    summary: "",
    imageURL: "",
    intent: "News",
  });
  const [questionsAnswers, setQuestionsAnswers] = useState([]);
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

  const handleSetContent = async () => {
    try {
      const response = await axios.post('/api/set-content', { content: formData.content });
      if (response.data.success) {
        console.log("Content successfully sent to server.");
      }
    } catch (error) {
      console.error('Error sending content to server:', error);
    }
}

// Replace handleGenerate with the following:
const handleGenerate = async () => {
    try {
      const response = await axios.post('/api/generate-questions-answers', {});
      setQuestionsAnswers(response.data);
    } catch (error) {
      console.error('Error generating questions and answers:', error);
    }
}

  const handleQuestionsAnswersChange = (index, field, value) => {
    const updatedQuestionsAnswers = [...questionsAnswers];
    updatedQuestionsAnswers[index][field] = value;
    setQuestionsAnswers(updatedQuestionsAnswers);
  }

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
      questionsAnswers,
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
        <button type="button" onClick={handleSetContent}>Set Content</button>
        <button type="button" onClick={handleGenerate}>Generate</button>

        {questionsAnswers && questionsAnswers.map((item, index) => (
          <div key={index}>
            <label>Question {index+1}:</label>
            <input
              type="text"
              value={item.question}
              onChange={(e) => handleQuestionsAnswersChange(index, 'question', e.target.value)}
            />
            <label>Answer {index+1}:</label>
            <input
              type="text"
              value={item.answer}
              onChange={(e) => handleQuestionsAnswersChange(index, 'answer', e.target.value)}
            />
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

  export default CreatePost;