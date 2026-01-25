import React from 'react';
import { Link } from 'react-router-dom';

export default function PrintWorks() {
  return (
    <div className="min-h-screen px-6 py-24 max-w-6xl mx-auto" dir="ltr">
      <h1 className="text-3xl font-bold mb-6">Print Works</h1>
      <p className="text-gray-700 mb-8">
        Print & packaging projects — brochures, posters, packaging and press-ready files prepared with attention to production details.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Packaging Design</h3>
          <p className="text-sm text-gray-500">Product packaging with dielines and print specs.</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Magazine Layout</h3>
          <p className="text-sm text-gray-500">Editorial layout and typography system.</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Print Collateral</h3>
          <p className="text-sm text-gray-500">Business cards, flyers and event posters.</p>
        </div>
      </div>

      <div className="mt-10">
        <Link to="/" className="text-sm text-gray-600 hover:underline">← Back to Home</Link>
      </div>
    </div>
  );
}