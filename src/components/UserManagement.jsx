import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const { data } = await supabase.from('users').select('*').eq('status', 'pending');
    setUsers(data || []);
  }

  async function approveUser(id, role) {
    await supabase.from('users').update({ status: 'approved', role }).eq('id', id);
    loadUsers();
  }

  async function rejectUser(id) {
    await supabase.from('users').update({ status: 'rejected' }).eq('id', id);
    loadUsers();
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  return (
    <div className="font-sans bg-gray-100 min-h-screen p-4">
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">User Management Panel</h1>
        <button onClick={logout} className="bg-white text-blue-900 px-3 py-1 rounded">Logout</button>
      </header>
      <div className="max-w-3xl mx-auto mt-4">
        <h2 className="text-xl font-semibold mb-2">Pending Users</h2>
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Assign Role</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.status}</td>
                <td className="px-4 py-2">
                  <select
                    onChange={(e) => approveUser(u.id, e.target.value)}
                    className="border p-1 rounded"
                    defaultValue="manager"
                    id={`role-${u.id}`}
                  >
                    <option value="manager">Manager</option>
                    <option value="operator">Operator</option>
                  </select>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => approveUser(u.id, document.getElementById(`role-${u.id}`).value)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => rejectUser(u.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
