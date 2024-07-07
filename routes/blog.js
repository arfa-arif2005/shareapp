const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.post('/add', (req, res) => {
  const { title, description, author } = req.body;
  const blog = new Blog({ title, description, author });
  blog.save((err, blog) => {
    if (err) {
      res.status(500).send({ message: 'Error adding blog' });
    } else {
      res.send({ message: 'Blog added successfully' });
    }
  });
});

router.get('/', (req, res) => {
  Blog.find().then(blogs => {
    res.send(blogs);
  }).catch(err => {
    res.status(500).send({ message: 'Error fetching blogs' });
  });
});

module.exports = router;