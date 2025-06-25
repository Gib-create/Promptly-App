import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSignup(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://gib-create.github.io/Promptly-App/field_login_ui.html',
      },
    });
    if (error) {
      setError(error.message);
      setSuccess('');
    } else {
      setError('');
      setSuccess('Account created. Please check your email to confirm.');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Create a Root Account</h2>
        <form onSubmit={handleSignup} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded"
          />
          <button type="submit" className="w-full bg-blue-700 text-white p-3 rounded font-bold">
            Sign Up
          </button>
        </form>
        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
        {success && <div className="text-green-600 text-center mt-2">{success}</div>}
        <p className="text-center mt-4 text-sm">
          Already registered? <Link to="/login" className="text-blue-700">Log in</Link>
        </p>
      </div>
    </div>
  );
}
