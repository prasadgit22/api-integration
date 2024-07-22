// src/ApiIntegration.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ApiIntegration.css";

const ApiIntegration = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ id: "", title: "", body: "" });

  // GET Request
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // POST Request
  const createPost = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        post
      );
      setPosts([...posts, response.data]);
      setPost({ id: "", title: "", body: "" });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // PUT Request
  const updatePost = async () => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        post
      );
      setPosts(posts.map((p) => (p.id === post.id ? response.data : p)));
      setPost({ id: "", title: "", body: "" });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // DELETE Request
  const deletePost = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="crud-component">
      <h1>CRUD Operations Demo</h1>

      <div className="form">
        <input
          type="text"
          placeholder="ID (for update/delete)"
          value={post.id}
          onChange={(e) => setPost({ ...post, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <textarea
          placeholder="Body"
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
        />
        <button onClick={createPost}>Create</button>
        <button onClick={updatePost}>Update</button>
      </div>

      <h2>Posts</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> <br />
            {p.body}
            <button onClick={() => deletePost(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiIntegration;
