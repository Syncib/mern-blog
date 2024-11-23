import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);  // Initialize with null
  const [redirect, setRedirect] = useState(false);

  const createNewPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);  // Fixed typo here
    data.set("content", content);

    if (files) {
      data.set("file", files[0]);  // Assuming single file upload for now
    }

    const response = await fetch("https://blog-server-zeta-tan.vercel.app/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    } else {
      // Handle errors (e.g., show a message to the user)
      console.error("Failed to create post");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setFiles(e.target.files)}  // Handle file changes
      />
      <Editor value={content} onChange={setContent} />
      <button type="submit" style={{ marginTop: "5px" }}>
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
