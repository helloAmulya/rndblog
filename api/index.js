// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// // app.use(cors());
// app.use(cors({ origin: 'https://daddy-blog-eight.vercel.app' }));
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose
//     .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Blog Schema
// const blogSchema = new mongoose.Schema({
//     title: String,
//     content: String,
//     author: String,
//     timestamp: { type: Date, default: Date.now },
// });

// const Blog = mongoose.model('Blog', blogSchema);

// // Routes

// // POST: Create a new blog
// app.post('/api/blogs', async (req, res) => {
//     const { title, content, author } = req.body;
//     try {
//         const blog = new Blog({ title, content, author });
//         await blog.save();
//         res.status(201).json(blog);
//     } catch (err) {
//         res.status(500).json({ message: 'Error saving blog', error: err });
//     }
// });

// // GET: Fetch all blogs
// app.get('/api/blogs', async (req, res) => {
//     try {
//         const blogs = await Blog.find().sort({ timestamp: -1 });
//         res.json(blogs);
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching blogs', error: err });
//     }
// });

// // **NEW** GET: Fetch a single blog by ID
// app.get('/api/blogs/:id', async (req, res) => {
//     try {
//         const blog = await Blog.findById(req.params.id);
//         if (!blog) {
//             return res.status(404).json({ message: 'Blog not found' });
//         }
//         res.json(blog);
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching blog', error: err });
//     }
// });

// // Start Server
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: 'https://daddy-blog-eight.vercel.app' })); // Replace with your frontend domain or remove the origin restriction for testing.
app.use(bodyParser.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Blog Schema
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    timestamp: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);

// Routes
app.post('/api/blogs', async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const blog = new Blog({ title, content, author });
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Error saving blog', error: err });
    }
});

app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ timestamp: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching blogs', error: err });
    }
});

app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching blog', error: err });
    }
});

// Export the Express app wrapped with serverless-http
module.exports = serverless(app);
