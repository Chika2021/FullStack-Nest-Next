'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';




interface Todo {
  _id: string;

  title: string;
  description: string;
  completed: boolean;
}

export default function Home() {


  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulating an API call to fetch todos
    const fetchTodos = async () => {
      setLoading(true);
      // Here you would typically fetch from your API
      // For example:
      const response = await fetch('http://localhost:4000/todo');
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    };

    fetchTodos();
  }, []);

  if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      const response = await fetch(`http://localhost:4000/todo/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo._id !== id));
      } else {
        alert("Failed to delete todo");
      }
    }
  };
  

  return (
  
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="flex justify-end mb-20 px-20">
            <Link href="/create" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Create Todo
            </Link>
          </div>
      <div className="max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">Todo List</h1>
          
        </div>

        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo._id }
              className="bg-white rounded-xl shadow p-4 flex justify-between items-start"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{todo.title}</h2>
                <p className="text-gray-600">{todo.description}</p>
                <span
                  className={`mt-1 inline-block px-2 py-1 text-xs font-medium rounded ${
                    todo.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {todo.completed ? 'Completed' : 'Pending'}
                </span>
              </div>

              <div className="flex space-x-2">
                <Link href={`/edit/${todo._id}`} key={todo._id} className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </Link>
                <button onClick={() => handleDelete(todo._id)} className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
