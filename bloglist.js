import React from 'react';

function BlogList({ blogs }) {
  return (
    <div className="container">
      <h1>My Blog</h1>
      <ul className="blog-list">
        {blogs.map(blog => (
          <li key={blog._id}>
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            <p>By {blog.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;