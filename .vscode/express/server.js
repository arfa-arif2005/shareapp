// server.js

const express = require('express');
const app = express();
const port = 3000;

// Database setup (e.g. MongoDB)
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true, useUnifiedTopology: true });

// Define blog post model
const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: Date
});
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// API routes
app.get('/api/blogs', async (req, res) => {
  const blogPosts = await BlogPost.find().exec();
  res.json(blogPosts);
});

app.post('/api/blogs', async (req, res) => {
  const { title, content, author } = req.body;
  const blogPost = new BlogPost({ title, content, author, date: new Date() });
  await blogPost.save();
  res.json({ message: 'Blog post created successfully' });
});

// User authentication (optional)
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password }).exec();
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.json({ message: 'User created successfully' });
});

// Serve static files
app.use(express.static('public'));

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});