import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogList from '../components/BlogList';

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('/blog/')
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>My Blog</h1>
      <BlogList blogs={blogs} />
    </div>
  );
}

export default Home;