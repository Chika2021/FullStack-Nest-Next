'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  

    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = { username, email, password }
        const response = await fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.user.username);
            alert('Registration successful!');
            setUsername('');
            setEmail('');
            setPassword('');
            router.push('/');
        } else {
            alert('Failed to register');
        }
        
    };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={username}
            onChange={ (e) => setUsername(e.target.value) }
            type="text"
            placeholder="Full Name"
            className="w-full rounded border border-gray-300 p-3 text-sm focus:outline-none focus:ring focus:ring-blue-300"
            required
                />
          <input
            name="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
            type="email"
            placeholder="Email Address"
            className="w-full rounded border border-gray-300 p-3 text-sm focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <input
            name="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
            type="password"
            placeholder="Password"
            className="w-full rounded border border-gray-300 p-3 text-sm focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          {/* <input
            name="confirmPassword"
            value={confirmPassword}
            onChange={ (e) => setConfirmPassword(e.target.value) }
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded border border-gray-300 p-3 text-sm focus:outline-none focus:ring focus:ring-blue-300"
            required
          /> */}
          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-3 text-white transition hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
