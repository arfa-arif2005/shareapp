// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true, useUnifiedTopology: true });

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String
});

const Blog = mongoose.model('Blog', blogSchema);

app.post('/blog/add', (req, res) => {
  const { title, content, author } = req.body;
  const blog = new Blog({ title, content, author });
  blog.save((err, blog) => {
    if (err) {
      res.status(500).send({ message: 'Error adding blog' });
    } else {
      res.send({ message: 'Blog added successfully' });
    }
  });
});