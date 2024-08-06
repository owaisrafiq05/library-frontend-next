'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/books') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setBooks(data))
      .catch(error => console.error('Fetch error:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to the Book Library</h1>
          <p className="text-lg mb-6">Discover and manage your favorite books with ease.</p>
          <Link href="/books/new">
            <span className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold cursor-pointer">Add New Book</span>
          </Link>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <div key={book._id} className="w-60 bg-gradient-to-r from-blue-100 to-green-100 text-gray-800 border border-gray-300 grid grid-cols-2 justify-center p-4 gap-4 rounded-lg shadow-md">
              <div className="col-span-2 text-lg font-bold capitalize rounded-md">
                {book.title}
              </div>
              <div className="col-span-2 rounded-md">
                {book.description.substring(0, 100)}...
              </div>
              <div className="col-span-1">
                <Link href={`/books/${book._id}`}>
                  <button className="rounded-md bg-blue-500 hover:bg-blue-600 text-white duration-300 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </button>
                </Link>
              </div>
              <div className="col-span-1">
                <p className="text-gray-600">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
