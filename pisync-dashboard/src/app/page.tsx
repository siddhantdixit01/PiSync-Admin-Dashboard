'use client';

import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import DeviceTable from '../components/DeviceTable';
import ErrorLogs from '../components/ErrorLogs';

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const [view, setView] = useState<'devices' | 'errors'>('devices');
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login';
    }
  }, [loading, user]);

  if (loading || !user) return null;

  const collapsed = !isSidebarHovered;

  return (
    <main className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 ease-in-out bg-white border-r h-full ${
          collapsed ? 'w-16' : 'w-64'
        } p-4 space-y-4 relative`}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >

        {/* Menu Buttons */}
        <button
          className={`flex items-center w-full text-left px-1 py-1 rounded ${
            view === 'devices' ? 'bg-blue-100' : ''
          }`}
          onClick={() => setView('devices')}
        >
          <span className="text-lg">📟</span>
          {!collapsed && <span className="ml-3">Devices</span>}
        </button>

        <button
          className={`flex items-center w-full text-left px-1 py-1 rounded ${
            view === 'errors' ? 'bg-blue-100' : ''
          }`}
          onClick={() => setView('errors')}
        >
          <span className="text-lg">⚠️</span>
          {!collapsed && <span className="ml-3">Sync Error Logs</span>}
        </button>

        <hr />

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center text-red-600 px-2 py-2 mt-4 w-full"
        >
          <span>🔒</span>
          {!collapsed && <span className="ml-2">Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <section className="flex-1 overflow-auto p-6">
        <h1 className="text-2xl font-bold mb-4">PiSync Admin</h1>
        {view === 'devices' && <DeviceTable />}
        {view === 'errors' && <ErrorLogs />}
      </section>
    </main>
  );
}
