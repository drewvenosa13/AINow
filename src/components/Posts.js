import React, { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../components/firebase";
import ArticleCard from './ArticleCard'; // <-- Import the ArticleCard component

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="Posts">
      <h1>Posts</h1>
      {[
        "AI Beginners",
        "AIAndMedia",
        "AIAndGovernment",
        "AIAndBusiness",
        "News",
      ].map((topic) => (
        <div key={topic}>
          <h2>{topic}</h2>
          {posts
            .filter((post) => post.topic === topic)
            .map((post) => (
              <ArticleCard key={post.id} id={post.id} title={post.title} imageUrl={post.image} summary={post.summary} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default Posts;
