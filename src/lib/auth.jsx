import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'nebula.users';
const SESSION_KEY = 'nebula.session';

const seededUser = {
  name: 'Alex',
  email: 'demo@nebula.dev',
  password: 'demo1234',
};

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* ignore */
  }
  // Seed a demo account so the UI has something to show
  return [seededUser];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers);
  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  useEffect(() => {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  }, [session]);

  const register = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const exists = users.some(
      (u) => u.email === normalizedEmail || u.name === name.trim(),
    );
    if (exists) {
      return { ok: false, error: '该邮箱或昵称已被注册，请直接登录' };
    }
    const user = { name: name.trim(), email: normalizedEmail, password };
    setUsers((prev) => [...prev, user]);
    setSession({
      user: { name: user.name, email: user.email },
      loggedInAt: Date.now(),
    });
    return { ok: true, user };
  };

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find((u) => u.email === normalizedEmail);
    if (!user) {
      return { ok: false, error: '账号不存在，请先注册' };
    }
    if (user.password !== password) {
      return { ok: false, error: '密码不正确，请重试' };
    }
    setSession({
      user: { name: user.name, email: user.email },
      loggedInAt: Date.now(),
    });
    return { ok: true, user };
  };

  const logout = () => setSession(null);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      session,
      isAuthenticated: Boolean(session),
      register,
      login,
      logout,
    }),
    [session, users],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
