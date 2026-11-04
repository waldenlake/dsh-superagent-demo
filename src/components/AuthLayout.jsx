export default function AuthLayout({ title, subtitle, action, children }) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-gradient-to-br from-brand-50 via-white to-slate-100 lg:grid-cols-2">
      {/* Brand / marketing panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl animate-float" />
          <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-brand-400/30 blur-3xl" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-2xl backdrop-blur">
            ✦
          </span>
          <div>
            <p className="text-xl font-bold tracking-tight">Nebula</p>
            <p className="text-xs text-brand-100/70">Demo Login &amp; Register</p>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
            把复杂留给后端，
            <br />
            把优雅留给你。
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-100/80">
            这是一个纯前端演示，使用本地 Mock 数据完成注册、登录与首页跳转。
            无需真实后端接口，即可体验完整的账号流程。
          </p>

          <ul className="mt-8 space-y-3">
            {[
              '注册即创建本地账号',
              '登录后可访问专属首页',
              '会话保存在浏览器本地',
            ].map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15 text-xs">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-brand-100/50">
          © 2026 Nebula · 前端演示 · 无后端接口
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="mb-6 flex items-center gap-2.5 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-xl text-white shadow-lg">
              ✦
            </span>
            <span className="text-lg font-bold text-slate-900">Nebula</span>
          </div>

          <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-card backdrop-blur sm:p-10">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {children}

            <div className="mt-6 text-center text-sm text-slate-500">
              {action}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
