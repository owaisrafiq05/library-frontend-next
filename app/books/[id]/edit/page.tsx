'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const EditBook = () => {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/books/${id}`) 
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setTitle(data.title);
          setAuthor(data.author);
          setPublishedDate(data.publishedDate.split('T')[0]); 
          setDescription(data.description);
        })
        .catch(error => console.error('Fetch error:', error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBook = { title, author, publishedDate, description };

    try {
      const response = await fetch(`http://localhost:3001/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBook)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      await response.json();
      router.push(`/books/${id}`);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto bg-gray-900 rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-white mb-6">Edit Book</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1 mt-1"
            />
          </div>
          <div>
            <label className="block text-white">Author</label>
            <input 
              type="text" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1 mt-1"
            />
          </div>
          <div>
            <label className="block text-white">Published Date</label>
            <input 
              type="date" 
              value={publishedDate} 
              onChange={(e) => setPublishedDate(e.target.value)} 
              className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1 mt-1"
            />
          </div>
          <div>
            <label className="block text-white">Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1 mt-1"
              rows="3"
            />
          </div>
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update Book</button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
