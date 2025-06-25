import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-extrabold text-blue-600 mb-4">Promptly</h1>
          <p className="text-xl text-gray-600 mb-8">
            Smart, secure, field-ready asset management. Built for engineers. Trusted by teams.
          </p>
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition"
          >
            Get Started
          </Link>
          <div className="mt-4">
            <Link to="/status" className="text-blue-600 hover:underline">
              View Service Status
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Promptly?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Asset QR Codes</h3>
            <p>Instantly generate unique QR codes for all your site assets.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Controlled Access</h3>
            <p>Granular user roles – Admin, Root, Manager, and Operator – ensure secure collaboration.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Live Notes + File Uploads</h3>
            <p>View and log field notes or documents against each asset, accessible anywhere.</p>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Trusted By On-Site Teams</h2>
          <p className="text-gray-700 text-lg italic max-w-2xl mx-auto mb-6">
            “Promptly transformed how we manage and hand over field assets. QR access, role separation, and fast uploads – it’s all here.”
            <br />
            <span className="font-bold mt-2 block">– Lead Site Engineer</span>
          </p>
        </div>
      </section>

      <footer className="text-center py-6 text-sm text-gray-500">&copy; 2025 Promptly. Built for Engineers.</footer>
    </div>
  );
}
