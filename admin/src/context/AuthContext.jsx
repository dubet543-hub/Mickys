import { createContext, useContext, useEffect, useState } from 'react';
import { api, getToken, setToken, clearToken } from '../api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* On load, if a token exists, fetch the current user to validate it. */
  useEffect(() => {
    let active = true;
    async function load() {
      if (!getToken()) { setLoading(false); return; }
      try {
        const { user } = await api.get('/auth/me');
        if (active) setUser(user);
      } catch {
        clearToken();
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  async function login(email, password) {
    const data = await api.post('/auth/login', { email, password }, { auth: false });
    if (data.user?.role !== 'admin') {
      throw new Error('This account does not have admin access.');
    }
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
