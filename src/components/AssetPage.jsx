import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import QRCode from 'qrcode';

export default function AssetPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [qr, setQr] = useState('');

  useEffect(() => {
    const url = `${window.location.origin}/asset/${id}`;
    QRCode.toDataURL(url).then(setQr);
    loadFiles();
    loadNotes();
  }, [id]);

  async function loadFiles() {
    const { data } = await supabase.storage.from('asset-files').list(`${id}/`);
    if (data) {
      const entries = await Promise.all(
        data.map(async (file) => {
          const link = await supabase.storage
            .from('asset-files')
            .createSignedUrl(`${id}/${file.name}`, 3600);
          return { name: file.name, url: link.data.signedUrl };
        })
      );
      setFiles(entries);
    }
  }

  async function loadNotes() {
    const { data } = await supabase
      .from('notes')
      .select('*')
      .eq('asset_id', id)
      .order('created_at', { ascending: false });
    setNotes(data || []);
  }

  async function uploadFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    await supabase.storage.from('asset-files').upload(`${id}/${file.name}`, file);
    loadFiles();
  }

  async function addNote() {
    if (!noteText) return;
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('notes').insert({ asset_id: id, user_id: user.id, content: noteText });
    setNoteText('');
    loadNotes();
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Asset Page</h1>
        <button onClick={logout} className="bg-white text-blue-900 px-3 py-1 rounded">Logout</button>
      </header>
      <div className="max-w-3xl mx-auto p-4 space-y-8">
        <section>
          <h2 className="text-blue-900 text-xl mb-2">Upload File</h2>
          <div className="bg-white p-4 rounded shadow">
            <input type="file" onChange={uploadFile} className="mb-2" />
            <div>
              {files.map((f) => (
                <div key={f.name} className="my-1">
                  <a href={f.url} target="_blank" rel="noreferrer" className="text-blue-700 underline">
                    {f.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-blue-900 text-xl mb-2">Notes</h2>
          <div className="bg-white p-4 rounded shadow">
            <textarea
              rows="4"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a note..."
              className="w-full p-2 border rounded mb-2"
            />
            <button onClick={addNote} className="bg-blue-700 text-white px-3 py-1 rounded">Add Note</button>
            <div className="mt-2 space-y-2">
              {notes.map((n) => (
                <div key={n.id} className="border p-2 rounded">
                  <strong>{n.content}</strong>
                  <br />
                  <small>{new Date(n.created_at).toLocaleString()}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-blue-900 text-xl mb-2">Asset QR Code</h2>
          <div className="bg-white inline-block p-4 rounded shadow">
            {qr && <img src={qr} alt="QR" />}
          </div>
        </section>
      </div>
    </div>
  );
}
