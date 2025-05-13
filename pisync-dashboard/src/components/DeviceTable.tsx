'use client';

import { useState, useEffect } from 'react';
import { fetchDevices, triggerSync } from '../lib/api';

type Device = {
  id: string;
  lastSyncTime: string;
  status: 'Success' | 'Pending' | 'Failed';
};

export default function DeviceTable() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    loadDevices();
  }, [page]);

  const loadDevices = async () => {
    setLoading(true);
    const res = await fetchDevices(page, limit);
    setDevices(res.data);
    setTotal(res.total);
    setLoading(false);
  };

  const handleSync = async (id: string) => {
    await triggerSync(id);
    alert(`Sync triggered for ${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Devices</h2>
        <button
          onClick={loadDevices}
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
            <th>Last Sync</th>
            <th>Status</th>
            <th>Sync Now</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <tr key={device.id}>
              <td className="p-2">{device.id}</td>
              <td>{device.lastSyncTime}</td>
              {/* <td>{new Date(device.lastSyncTime).toLocaleString()}</td> */}
              <td>{device.status}</td>
              <td>
                <button
                  onClick={() => handleSync(device.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Sync Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button 
          disabled={page === 1} 
          onClick={() => setPage(p => p - 1)} 
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">Page {page}</span>
        <button
          disabled={page >= Math.ceil(total / limit)}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500 mt-2">Refreshing...</p>}
    </div>
  );
}
