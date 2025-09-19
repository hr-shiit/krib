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
    <div>
      <h3>Contract Initialization</h3>
      <p className="modal-subtitle">Configure your smart contract parameters</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-grid">
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

        <div className="form-buttons">
          <button 
            type="button" 
            onClick={onCancel}
            className="secondary"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="primary"
          >
            Create Contract
          </button>
        </div>
      </form>
    </div>
  );
}
