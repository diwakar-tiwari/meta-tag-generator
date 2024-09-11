import React, { useState } from 'react'


const MetaTagGenerator = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      keywords: '',
      author: ''
    });
    const [metaTags, setMetaTags] = useState('');
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Sending the form data to the backend
      const response = await fetch('http://localhost:5000/api/generate-meta-tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
      setMetaTags(result.metaTags);
    };
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(metaTags);
      alert('Meta tags copied to clipboard!');
    };
  
    return (
      <div>
        <h1>Meta Tag Generator</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Page Title:
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="Enter page title" 
              required 
            />
          </label>
          <label>
            Description:
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Enter page description" 
              required 
            />
          </label>
          <label>
            Keywords:
            <input 
              type="text" 
              name="keywords" 
              value={formData.keywords} 
              onChange={handleChange} 
              placeholder="Enter keywords separated by commas" 
              required 
            />
          </label>
          <label>
            Author (optional):
            <input 
              type="text" 
              name="author" 
              value={formData.author} 
              onChange={handleChange} 
              placeholder="Enter author name" 
            />
          </label>
          <button type="submit">Generate Meta Tags</button>
        </form>
  
        {metaTags && (
          <div>
            <h3>Generated Meta Tags:</h3>
            <pre>{metaTags}</pre>
            <button onClick={copyToClipboard}>Copy to Clipboard</button>
          </div>
        )}
      </div>
    );
};
  

export default MetaTagGenerator