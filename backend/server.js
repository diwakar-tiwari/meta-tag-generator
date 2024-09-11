const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route to generate meta tags
app.post('/api/generate-meta-tags', (req, res) => {
  const { title, description, keywords, author } = req.body;

  const metaTags = `
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    ${author ? `<meta name="author" content="${author}">` : ''}
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  `;

  res.json({ metaTags });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
