import React, { useState } from "react";

export default function DirectTransferForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    address: "",
    amount: ""
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Direct Transfer</h1>
        <p className="text-gray-600">Transfer tokens directly to recipient</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-200 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Recipient Address
              </label>
              <input 
                type="text" 
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="0x..." 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white font-mono text-sm"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Amount
              </label>
              <input 
                type="number" 
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                placeholder="Enter amount" 
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-indigo-800 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              Transfer
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
