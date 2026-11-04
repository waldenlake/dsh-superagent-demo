import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import AuthLayout from '../components/AuthLayout.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const passwordStrength = (pw) => {
    if (pw.length === 0) return 0;
    let s = 0;
    if (pw.length >= 8) s += 1;
    if (pw.length >= 12) s += 1;
    if (/[A-Z]/.test(pw)) s += 1;
    if (/[0-9]/.test(pw)) s += 1;
    if (/[^A-Za-z0-9]/.test(pw)) s += 1;
    return Math.min(5, s);
  };

  const strength = passwordStrength(form.password);
  const strengthColor =
    strength === 0
      ? 'bg-slate-200'
      : strength <= 2
        ? 'bg-rose-400'
        : strength <= 4
          ? 'bg-amber-400'
          : 'bg-emerald-500';
  const strengthLabel =
    strength === 0
      ? ''
      : strength <= 2
        ? '弱'
        : strength <= 4
          ? '中'
          : '强';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.name.trim().length < 2) {
      setError('昵称至少需要 2 个字符');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('请输入有效的邮箱地址');
      return;
    }
    if (form.password.length < 8) {
      setError('密码至少需要 8 位');
      return;
    }
    if (form.password !== form.confirm) {
      setError('两次输入的密码不一致');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const result = register(form);
      setSubmitting(false);
      if (result.ok) {
        navigate('/home', { replace: true });
      } else {
        setError(result.error);
      }
    }, 350);
  };

  return (
    <AuthLayout
      title="创建账号"
      subtitle="注册 Nebula，开启你的专属空间"
      action={
        <>
          已有账号？
          <Link
            to="/login"
            className="ml-1 font-semibold text-brand-600 hover:text-brand-700"
          >
            登录
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
          label="昵称"
          name="name"
          placeholder="给你的账号取个名字"
          value={form.name}
          onChange={handleChange}
        />

        <Field
          label="邮箱"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
        />

        <div>
          <Field
            label="密码"
            type="password"
            name="password"
            placeholder="至少 8 位"
            value={form.password}
            onChange={handleChange}
          />
          {form.password ? (
            <div className="mt-2">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i < strength ? strengthColor : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              {strengthLabel ? (
                <p className="mt-1 text-right text-xs text-slate-500">
                  强度：{strengthLabel}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <Field
          label="确认密码"
          type="password"
          name="confirm"
          placeholder="再次输入密码"
          value={form.confirm}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={submitting}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:from-brand-600 hover:to-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative z-10">
            {submitting ? '注册中…' : '注册'}
          </span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
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
