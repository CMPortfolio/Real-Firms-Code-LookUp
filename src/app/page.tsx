'use client';

import { useState } from 'react';
import Image from 'next/image';
import SearchInterface from '@/components/SearchInterface';
import ResultsTable from '@/components/ResultsTable';

export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <main>
      <nav className="bg-[#AC162C] w-full py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="w-[300px] h-[25px] relative">
              <Image
                src="/images/Linstol Logo Wordmark White.png"
                alt="Linstol Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h1 className="text-white text-2xl font-bold">Public FIRMS Code Search</h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <SearchInterface 
          onSearch={setSearchResults}
          setIsLoading={setIsLoading}
          setError={setError}
        />
        
        {error && (
          <div className="text-red-500 mt-4">{error}</div>
        )}
        
        {isLoading && (
          <div className="text-blue-500 mt-4">Loading...</div>
        )}
        
        <ResultsTable results={searchResults} />
      </div>
    </main>
  );
} 