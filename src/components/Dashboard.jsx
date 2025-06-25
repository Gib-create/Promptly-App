import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [hubId, setHubId] = useState(null);
  const [form, setForm] = useState({ name: '', identifier: '', description: '', context: '' });
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const { data: userResult } = await supabase.auth.getUser();
    if (!userResult?.user) {
      navigate('/login');
      return;
    }
    await getOrCreateHub();
    fetchAssets();
    fetchUsers();
  }

  async function getOrCreateHub() {
    const { data: sessionData } = await supabase.auth.getSession();
    const authId = sessionData?.session?.user?.id;
    if (!authId) return;
    const { data: userRow } = await supabase.from('users').select('id').eq('auth_id', authId).single();
    if (!userRow) return;
    const internalUserId = userRow.id;
    const { data: existingHub } = await supabase.from('hubs').select('*').eq('owner_id', internalUserId).single();
    if (existingHub) {
      setHubId(existingHub.id);
    } else {
      const { data: newHub } = await supabase
        .from('hubs')
        .insert([{ owner_id: internalUserId, name: 'My Hub' }])
        .select()
        .single();
      setHubId(newHub.id);
    }
  }

  async function fetchAssets() {
    if (!hubId) return;
    const { data } = await supabase.from('assets').select('*').eq('hub_id', hubId);
    setAssets(data || []);
  }

  async function fetchUsers() {
    if (!hubId) return;
    const { data } = await supabase
      .from('users')
      .select('*')
      .neq('status', 'pending')
      .eq('hub_id', hubId);
    setUsers(data || []);
  }

  async function createAsset() {
    if (!hubId) return;
    const { name, identifier, description, context } = form;
    await supabase.from('assets').insert([{ name, identifier, description, context_prompt: context, hub_id: hubId }]);
    setForm({ name: '', identifier: '', description: '', context: '' });
    fetchAssets();
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Promptly Hub Dashboard</h1>
        <button onClick={logout} className="bg-white text-blue-900 px-3 py-1 rounded">Logout</button>
      </header>
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">Your Assets</h2>
          {assets.length === 0 ? (
            <p>No assets found.</p>
          ) : (
            assets.map((asset) => (
              <div key={asset.id} className="bg-white p-4 rounded shadow my-2">
                <Link to={`/asset/${asset.id}`} className="text-blue-700 font-bold">
                  {asset.name}
                </Link>
                <p>{asset.description}</p>
              </div>
            ))
          )}
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Add New Asset</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Identifier"
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Context Prompt"
              value={form.context}
              onChange={(e) => setForm({ ...form, context: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button onClick={createAsset} className="bg-blue-700 text-white px-4 py-2 rounded">
              Create Asset
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Users in Your Hub</h2>
          {users.length === 0 ? (
            <p>No team members found.</p>
          ) : (
            users.map((u) => (
              <div key={u.id} className="bg-white p-2 rounded shadow my-1">
                {u.email} – {u.role}
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
