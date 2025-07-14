'use client'
import React, { useState } from 'react'

// This is a simple Todo creation page using React and Tailwind CSS
// It allows users to input a title, description, and completion status for a new Todo item

function page() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const todo = { title, description, completed };
  //   console.log('Todo created:', todo);
  //   // You can send this to your backend API using fetch/axios
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const todo = { title, description, completed };

    const response = await fetch('http://localhost:4000/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    if (response.ok) {
      alert('Todo created successfully!');
      // Optionally redirect or reset the form
      setTitle('');
      setDescription('');
      setCompleted(false);
    } else {
      alert('Failed to create todo');
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Create Todo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <textarea
              className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="completed"
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            <label htmlFor="completed" className="text-sm text-gray-700">Completed</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Todo
          </button>
        </form>
      </div>
    </div>
  )
}

export default page