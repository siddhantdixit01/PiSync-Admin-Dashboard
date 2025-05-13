'use client';

import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={e => {
          e.preventDefault();
          login(username);
        }}
        className="p-6 border rounded bg-white shadow-md space-y-4"
      >
        <h2 className="text-xl font-bold">PiSync Admin Login</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border p-2 w-full"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}
