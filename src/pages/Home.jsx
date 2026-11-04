import { useAuth } from '../lib/auth.jsx';

const perks = [
  {
    icon: '🚀',
    title: '快速上手',
    desc: '极简注册流程，几秒即可进入你的专属空间',
  },
  {
    icon: '🎨',
    title: '精美体验',
    desc: '为细节而生的界面，让每一次使用都赏心悦目',
  },
  {
    icon: '🔐',
    title: '本地安全',
    desc: '演示环境使用本地 Mock 数据，无需真实后端接口',
  },
];

export default function Home() {
  const { user, logout } = useAuth();
  const initials = (user?.name ?? 'U')
    .slice(0, 2)
    .toUpperCase();

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 6) return '夜深了';
    if (h < 12) return '早上好';
    if (h < 18) return '下午好';
    return '晚上好';
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-slate-50 text-slate-900">
      {/* Decorative background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-300/30 blur-3xl animate-float" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-lg text-white shadow-lg shadow-brand-500/30">
              ✦
            </span>
            <span className="text-lg font-bold tracking-tight">
              Nebula
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/80 py-1.5 pl-1.5 pr-4 shadow-sm backdrop-blur">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
                {initials}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-800">
                  {user?.name}
                </p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
            >
              退出登录
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="mt-16 text-center">
          <span className="inline-block rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
            ✦ 欢迎进入 Nebula
          </span>
          <h1 className="mt-6 bg-gradient-to-br from-slate-900 via-slate-700 to-brand-700 bg-clip-text text-5xl font-extrabold leading-tight tracking-tight text-transparent md:text-6xl">
            {greeting}，{user?.name}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
            这是一个纯前端演示空间。你刚刚完成了
            <span className="font-semibold text-slate-800"> 注册 · 登录 </span>
            的完整流程，现在正在你自己的首页。
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              当前登录会话正常
            </span>
            <span className="text-xs text-slate-400">
              登录于{' '}
              {new Date().toLocaleString('zh-CN', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </section>

        {/* Feature cards */}
        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {perks.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-card backdrop-blur transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl transition group-hover:scale-110">
                {p.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {p.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {p.desc}
              </p>
            </div>
          ))}
        </section>

        {/* Activity mock */}
        <section className="mt-16">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              最近动态
            </h2>
            <span className="text-xs text-slate-400">Mock 数据 · 仅前端</span>
          </div>
          <div className="mt-4 space-y-3">
            {[
              {
                emoji: '✅',
                title: '账号创建成功',
                desc: `${user?.name} 的 Nebula 空间已就绪`,
                time: '刚刚',
              },
              {
                emoji: '🔔',
                title: '欢迎通知',
                desc: '欢迎来到你的专属首页',
                time: '刚刚',
              },
              {
                emoji: '🛡️',
                title: '安全提示',
                desc: '演示环境使用本地 Mock 数据，退出后清除会话',
                time: '持续生效',
              },
            ].map((a) => (
              <div
                key={a.title}
                className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white p-4 shadow-input transition hover:border-brand-200"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-50 text-lg">
                  {a.emoji}
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-800">
                      {a.title}
                    </p>
                    <span className="text-xs text-slate-400">{a.time}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-200/70 pt-6 text-center text-xs text-slate-400">
          Nebula · React 前端登录注册演示 · 无后端接口 · Mock 数据
        </footer>
      </div>
    </div>
  );
}
