import React from 'react'
import dumimg from "./assets/images/blog-1.jpg";
const Post = () => {
  return (
    <div className="post">
    <div className="image">
      <img src={dumimg} alt="imge" />
    </div>
    <div className="texts">
      <h2>Full-house battery backup coming later this year</h2>
      <p className="info">
        <a className="author">Saqib Abbas</a>
        <time>2023-01-06 16:45</time>
      </p>
      <p className="summary">
        It is a long established fact that a reader will be distracted by
        the readable content of a page when looking at its layout.
      </p>
    </div>
  </div>
  )
}

export default Post