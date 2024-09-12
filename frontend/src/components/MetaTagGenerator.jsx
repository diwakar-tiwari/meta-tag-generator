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
      <div className='ml-20 mt-5 mr-12 p-10'>
        <h1 className='text-4xl'>Meta Tag Generator</h1>
        <p className='mt-6 text-lg'>The meta tag generator will create description, keyword and other important meta tags for you with provided content..</p>
        <p className='text-lg'>Meta tags are HTML elements that offer information about your website, such as a description. Search engines use meta tags to assist in indexing and delivering relevant content in search results.</p>
        <div className='mt-8'>
          <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-8 '>
            <label className='grid col-span-2'>
              Page Title:
              <input 
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="Enter page title" 
                required 
              />
            </label>
            <label className='grid grid-cols-1'>
              Description:
              <textarea 
              className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Enter page description" 
                required 
              />
            </label>
            <label className='grid grid-cols-1'>
              Keywords:
              <textarea 
                className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                type="text" 
                name="keywords" 
                value={formData.keywords} 
                onChange={handleChange} 
                placeholder="Enter keywords separated by commas" 
                required 
              />
            </label>
            <label className='grid col-span-2'>
              Author (optional):
              <input 
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                type="text" 
                name="author" 
                value={formData.author} 
                onChange={handleChange} 
                placeholder="Enter author name" 
              />
            </label>
            <button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm max-w-44 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Generate Meta Tags</button>
          </form>
        </div>
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