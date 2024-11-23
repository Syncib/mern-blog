import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function createNewPost(ev) {
    ev.preventDefault();

    // Check if files are selected
    if (!files) {
      setErrorMessage("Please select an image.");
      return;
    }

    // Prepare FormData for the request
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]); // Attach the selected file

    try {
      // Send POST request to the backend
      const response = await fetch('https://blog-server-dun.vercel.app/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);  // Redirect to the home page after successful post creation
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  }

  // Redirect to home page after post creation
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={createNewPost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={ev => setTitle(ev.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={ev => setSummary(ev.target.value)}
          required
        />
        <input
          type="file"
          onChange={ev => setFiles(ev.target.files)}
          required
        />
        <Editor value={content} onChange={setContent} />
        <button type="submit" style={{ marginTop: '5px' }}>Create Post</button>
      </form>

      {/* Show error message if there's any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
