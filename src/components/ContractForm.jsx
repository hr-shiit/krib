import React, { useState } from "react";

export default function ContractForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    decimals: "",
    totalSupply: "",
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Contract Initialization</h1>
        <p className="text-gray-600">Configure your smart contract parameters</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Contract Name
              </label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., MyToken" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Token Symbol
              </label>
              <input 
                type="text" 
                value={formData.symbol}
                onChange={(e) => handleChange('symbol', e.target.value)}
                placeholder="e.g., MTK" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Decimals
              </label>
              <input 
                type="number" 
                value={formData.decimals}
                onChange={(e) => handleChange('decimals', e.target.value)}
                placeholder="e.g., 18" 
                min="0"
                max="18"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Total Supply
              </label>
              <input 
                type="number" 
                value={formData.totalSupply}
                onChange={(e) => handleChange('totalSupply', e.target.value)}
                placeholder="e.g., 1000000" 
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Contract Address
            </label>
            <input 
              type="text" 
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="0x..." 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white font-mono text-sm"
              required
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Create Contract
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
