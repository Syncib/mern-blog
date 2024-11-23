import React, { useEffect, useState } from "react";
import Post from "../Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://blog-server-zeta-tan.vercel.app/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => <Post {...post} />)
      ) : (
        <p>No Posts to Show</p>
      )}
    </>
  );
};

export default IndexPage;
