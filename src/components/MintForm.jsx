import React, { useState } from "react";

export default function MintForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    address: "",
    amount: "",
    tokenid: "",
    tokenuri: ""
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mint Initialization</h1>
        <p className="text-gray-600">Create new tokens with specified parameters</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Address
              </label>
              <input 
                type="text" 
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="0x..." 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white font-mono text-sm"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Token ID
              </label>
              <input 
                type="text" 
                value={formData.tokenid}
                onChange={(e) => handleChange('tokenid', e.target.value)}
                placeholder="Enter token ID" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Token URI
              </label>
              <input 
                type="text" 
                value={formData.tokenuri}
                onChange={(e) => handleChange('tokenuri', e.target.value)}
                placeholder="Enter token URI" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-purple-800 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Mint Tokens
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
