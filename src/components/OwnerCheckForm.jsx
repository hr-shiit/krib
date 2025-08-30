import React, { useState } from "react";

export default function OwnerCheckForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    tokenID: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-200">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Owner Check</h1>
        <p className="text-gray-600">Verify token ownership</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg border border-teal-200 shadow-sm">
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Token ID
            </label>
            <input 
              type="text" 
              value={formData.tokenID}
              onChange={(e) => handleChange('tokenID', e.target.value)}
              placeholder="Enter token ID" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Enter the token ID to check its current owner
            </p>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-6 rounded-lg hover:from-teal-700 hover:to-teal-800 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Check Owner
            </span>
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 font-semibold transition-all duration-200 border border-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
