import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ServiceStatus() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/services.json')
      .then((res) => res.json())
      .then(setServices)
      .catch(() => setError(true));
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Service Status</h1>
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Service</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr>
                <td className="px-4 py-2" colSpan="2">
                  Failed to load service data.
                </td>
              </tr>
            )}
            {services.map((s) => (
              <tr key={s.name}>
                <td className="border-t px-4 py-2">{s.name}</td>
                <td className="border-t px-4 py-2">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-600 underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
