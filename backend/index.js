const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data for Featured Blogs
const featuredBlogs = [
  {
    _id: '1',
    title: 'Focus: How movement feels when shared.',
    slug: 'focus-movement-shared',
    thumbnailImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
    tags: ['Community', 'Mindset'],
    averageReadTime: 4,
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'The science of small wins in fitness.',
    slug: 'science-small-wins',
    thumbnailImage: 'https://images.unsplash.com/photo-1571019623452-c697c22c4a18?q=80&w=2070&auto=format&fit=crop',
    tags: ['Research', 'Consistency'],
    averageReadTime: 6,
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'Why isolation is the biggest hurdle.',
    slug: 'isolation-hurdle',
    thumbnailImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop',
    tags: ['Psychology', 'Social'],
    averageReadTime: 5,
    createdAt: new Date().toISOString()
  }
];

// Routes
app.get('/blog/featured', (req, res) => {
  res.json({
    success: true,
    data: featuredBlogs
  });
});

app.post('/contact', (req, res) => {
  const { name, email, reason, message } = req.body;
  if (!name || !email || !reason || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  res.json({ success: true, message: 'Message received!' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
