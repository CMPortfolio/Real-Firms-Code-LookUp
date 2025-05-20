'use client';

interface ResultsTableProps {
  results: any[];
}

export default function ResultsTable({ results }: ResultsTableProps) {
  if (results.length === 0) {
    return null;
  }

  const columns = [
    'FIRMS Code',
    'FIRMS Name',
    'Facility Type',
    'Address',
    'City',
    'State',
    'Zip',
    'Country',
    'FIRMS Status'
  ];

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((result, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.firmCode}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.firmName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.facilityType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.address}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.city}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.state}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.zip}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.country}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 