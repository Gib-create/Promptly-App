import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      const session = await supabase.auth.getSession();
      const userId = session.data.session.user.id;
      const { data: userDetails } = await supabase
        .from('users')
        .select('role, status')
        .eq('auth_id', userId)
        .single();

      if (userDetails && userDetails.status === 'approved') {
        navigate('/dashboard');
      } else {
        setError('Account not approved yet.');
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Promptly Field Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-2"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-700 text-white rounded p-3 font-bold mt-2"
        >
          Login
        </button>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <div className="text-center mt-4 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-700 font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
