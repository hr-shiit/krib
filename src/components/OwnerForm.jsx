import React, { useState } from "react";

export default function OwnerForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    address: ""
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Owner Initialization</h1>
        <p className="text-gray-600">Set the contract owner address</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200 shadow-sm">
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Owner Address
            </label>
            <input 
              type="text" 
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="0x..." 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white font-mono text-sm"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Enter the Ethereum address that will have owner privileges
            </p>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-800 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Set Owner
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
