import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import AuthLayout from '../components/AuthLayout.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? '/home';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    // Simulate a short network delay to feel realistic
    setTimeout(() => {
      const result = login(form);
      setSubmitting(false);
      if (result.ok) {
        navigate(from, { replace: true });
      } else {
        setError(result.error);
      }
    }, 350);
  };

  return (
    <AuthLayout
      title="欢迎回来"
      subtitle="登录 Nebula 以继续你的旅程"
      action={
        <>
          还没有账号？
          <Link
            to="/register"
            className="ml-1 font-semibold text-brand-600 hover:text-brand-700"
          >
            注册
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <Field
          label="邮箱"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
        />

        <Field
          label="密码"
          type="password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={submitting}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:from-brand-600 hover:to-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative z-10">
            {submitting ? '登录中…' : '登录'}
          </span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <button
            type="button"
            onClick={() =>
              setForm({ email: 'demo@nebula.dev', password: 'demo1234' })
            }
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-slate-600 hover:bg-slate-50"
          >
            填充演示账号
          </button>
          <span>demo@nebula.dev / demo1234</span>
        </div>
      </form>
    </AuthLayout>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/15"
      />
    </label>
  );
}
