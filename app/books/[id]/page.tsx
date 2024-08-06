'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const BookDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/books/${id}`) 
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setBook(data))
        .catch(error => console.error('Fetch error:', error));
    }
  }, [id]);

  if (!book) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/books/${book._id}`, { method: 'DELETE' }); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      router.push('/');
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <Link href="/">
          <span className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Back to Home</span>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <div className="max-w-lg w-full mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{book.title}</h1>
          <p className="text-gray-600 mb-2"><span className="font-semibold">Author:</span> {book.author}</p>
          <p className="text-gray-600 mb-2"><span className="font-semibold">Published Date:</span> {new Date(book.publishedDate).toLocaleDateString()}</p>
          <p className="text-gray-800 mt-4 mb-6">{book.description}</p>
          <div className="flex justify-between items-center mt-4">
            <Link href={`/books/${book._id}/edit`}>
              <span className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer">Edit Book</span>
            </Link>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
