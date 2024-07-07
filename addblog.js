import React, { useState } from 'react';
import axios from 'axios';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('/blog/add', { title, description, author })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h1>Add Blog</h1>
      <form onSubmit={handleSubmit} className="add-blog-form">
        <label>
          Title:
          <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={event => setDescription(event.target.value)} />
        </label>
        <br />
        <label>
          Author:
          <input type="text" value={author} onChange={event => setAuthor(event.target.value)} />
        </label>
        <br />
        <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Add Blog
        </button>
      </form>
    </div>
  );
}

export default AddBlog;