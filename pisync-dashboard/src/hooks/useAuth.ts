'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // <-- added loading state
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('pisync-user');
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false); // <-- wait until auth check is done
  }, []);

  const login = (username: string) => {
    localStorage.setItem('pisync-user', username);
    setUser(username);
    router.push('/');
  };

  const logout = () => {
    localStorage.removeItem('pisync-user');
    setUser(null);
    router.push('/login');
  };

  return { user, login, logout, loading };
}
