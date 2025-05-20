'use client';

import { useState } from 'react';

interface SearchInterfaceProps {
  onSearch: (results: any[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

export default function SearchInterface({ onSearch, setIsLoading, setError }: SearchInterfaceProps) {
  const [searchMode, setSearchMode] = useState<'general' | 'specific'>('general');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [generalSearchTerm, setGeneralSearchTerm] = useState('');
  
  // Specific search fields
  const [specificSearch, setSpecificSearch] = useState({
    firmCode: '',
    firmName: '',
    facilityType: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    status: ''
  });

  const handleSearch = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: searchMode,
          caseSensitive,
          ...(searchMode === 'general' 
            ? { searchTerm: generalSearchTerm }
            : specificSearch
          ),
        }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      onSearch(data);
    } catch (err) {
      setError('An error occurred while searching');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setGeneralSearchTerm('');
    setSpecificSearch({
      firmCode: '',
      firmName: '',
      facilityType: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      status: ''
    });
    onSearch([]);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <select
          value={searchMode}
          onChange={(e) => setSearchMode(e.target.value as 'general' | 'specific')}
          className="form-select"
        >
          <option value="general">General Search (All Fields)</option>
          <option value="specific">Search By Specific Fields</option>
        </select>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="caseSensitive"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <label htmlFor="caseSensitive" className="ml-2">Case Sensitive</label>
        </div>
      </div>

      {searchMode === 'general' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              value={generalSearchTerm}
              onChange={(e) => setGeneralSearchTerm(e.target.value)}
              placeholder="Enter search term (searches across all fields)"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
            <button
              onClick={clearSearch}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold mb-1">FIRMS Code:</label>
              <input
                type="text"
                value={specificSearch.firmCode}
                onChange={(e) => setSpecificSearch({...specificSearch, firmCode: e.target.value})}
                placeholder="C556"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">FIRMS Name:</label>
              <input
                type="text"
                value={specificSearch.firmName}
                onChange={(e) => setSpecificSearch({...specificSearch, firmName: e.target.value})}
                placeholder="Michael Lewis"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Facility Type:</label>
              <select
                value={specificSearch.facilityType}
                onChange={(e) => setSpecificSearch({...specificSearch, facilityType: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Type</option>
                <option value="Bonded Warehouse">Bonded Warehouse</option>
                <option value="Bridge">Bridge</option>
                <option value="CES">CES</option>
                <option value="Customs Administrative Site">Customs Administrative Site</option>
                <option value="Customs Container Station">Customs Container Station</option>
                <option value="Data Processing Site">Data Processing Site</option>
                <option value="Foreign Trade Zone">Foreign Trade Zone</option>
                <option value="Importer Premises">Importer Premises</option>
                <option value="Inspection Facility">Inspection Facility</option>
                <option value="Multi-Use-Bonded">Multi-Use-Bonded</option>
                <option value="Pier">Pier</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold mb-1">Street Address:</label>
              <input
                type="text"
                value={specificSearch.address}
                onChange={(e) => setSpecificSearch({...specificSearch, address: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">City:</label>
              <input
                type="text"
                value={specificSearch.city}
                onChange={(e) => setSpecificSearch({...specificSearch, city: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">State:</label>
              <input
                type="text"
                value={specificSearch.state}
                onChange={(e) => setSpecificSearch({...specificSearch, state: e.target.value})}
                placeholder="CA"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold mb-1">Zip:</label>
              <input
                type="text"
                value={specificSearch.zip}
                onChange={(e) => setSpecificSearch({...specificSearch, zip: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Country:</label>
              <input
                type="text"
                value={specificSearch.country}
                onChange={(e) => setSpecificSearch({...specificSearch, country: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">FIRMS Status:</label>
              <select
                value={specificSearch.status}
                onChange={(e) => setSpecificSearch({...specificSearch, status: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Status</option>
                <option value="ACTIVE">Active</option>
                <option value="DEACTIVATED">Deactivated</option>
                <option value="ACTIVATED">Activated</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
            <button
              onClick={clearSearch}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 