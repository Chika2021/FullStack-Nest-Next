'use client'
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

// interface EditTodoProps {
//   id: string;
// }

function page() {
  const router = useRouter();
  const { id } = useParams();
  if (!id) {
    return <div>Todo not found</div>;
  }

  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/todo/${id}`);
      const data = await response.json();
      setTodo(data);
      setLoading(false);
    };

    fetchTodo();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!todo) return;
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!todo) return;
    setTodo({ ...todo, completed: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!todo) return;

    const response = await fetch(`http://localhost:4000/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(todo),
    });

    if (response.ok) {
      alert("Todo updated successfully!");
      router.push('/');
    }
  };
  if (!todo) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-700">Todo not found</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

   return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Edit Todo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              name="title"
              value={todo?.title || ""}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={todo?.title || "Enter title"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <textarea
              name="description"
              rows={3}
              value={todo?.description || ""}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={todo?.description || "Enter description"}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={!!todo?.completed}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="completed" className="text-sm text-gray-700">Completed</label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 transition"
          >
            Update Todo
          </button>
        </form>
      </div>
    </div>
  );
}

export default page