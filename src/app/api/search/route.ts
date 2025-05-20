import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mode, caseSensitive, searchTerm, ...specificSearch } = body;

    // Read and parse the CSV file
    const filePath = path.join(process.cwd(), 'src/data/250507, Updated Firm Codes.csv');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    const { data } = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true
    });

    // Filter the data based on search mode
    const results = data.filter((row: any) => {
      if (mode === 'general') {
        // General search across all fields
        return Object.values(row).some((value: any) => {
          const searchValue = caseSensitive ? searchTerm : searchTerm.toLowerCase();
          const fieldValue = caseSensitive ? String(value) : String(value).toLowerCase();
          return fieldValue.includes(searchValue);
        });
      } else {
        // Specific field search
        return Object.entries(specificSearch).every(([key, value]) => {
          if (!value) return true; // Skip empty search fields
          
          const searchValue = caseSensitive ? String(value) : String(value).toLowerCase();
          const fieldValue = caseSensitive ? String(row[key]) : String(row[key]).toLowerCase();
          return fieldValue.includes(searchValue);
        });
      }
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
} 