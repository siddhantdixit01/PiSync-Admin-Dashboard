'use client';

import { useEffect, useState } from 'react';
import { fetchErrors } from '../lib/api';

type ErrorLog = {
  deviceId: string;
  error: string;
  time: string;
};

export default function ErrorLogs() {
  const [logs, setLogs] = useState<ErrorLog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const logsPerPage = 10;

  const loadLogs = async () => {
    setLoading(true);
    const data = await fetchErrors();
    setLogs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const totalPages = Math.ceil(logs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const currentLogs = logs.slice(startIndex, startIndex + logsPerPage);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sync Error Logs</h2>
        <button
          onClick={loadLogs}
          className="text-blue-600 hover:text-blue-800 text-lg"
          title="Refresh"
        >
          🔄
        </button>
      </div>

      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Device ID</th>
            <th>Error</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.map(log => (
            <tr key={`${log.deviceId}`}>
              <td className="p-2">{log.deviceId}</td>
              <td>{log.error}</td>
              <td>{log.time}</td>
              {/* <td>{new Date(log.time).toLocaleString()}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500 mt-2">Refreshing...</p>}
    </div>
  );
}
