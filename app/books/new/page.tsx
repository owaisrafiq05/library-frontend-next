'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NewBook = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = { title, author, publishedDate, description };

    try {
      const response = await fetch('http://localhost:3001/books', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
      router.push('/');
    } catch (error) {
      console.error('Post error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto bg-gray-900 rounded-lg p-8 shadow-sm">
        <h2 className="text-white font-bold text-lg mb-6">Add New Book</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white" htmlFor="title">Title</label>
            <input
              placeholder="Book title"
              className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1 mt-1"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white" htmlFor="author">Author</label>
            <input
              placeholder="Author name"
              className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1 mt-1"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white" htmlFor="publishedDate">Published Date</label>
            <input
              className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1 mt-1"
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white" htmlFor="description">Description</label>
            <textarea
              placeholder="Book description"
              className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1 mt-1"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button className="bg-white text-black rounded-md px-4 py-1 hover:bg-blue-500 hover:text-white transition-all duration-200" type="submit">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBook;
