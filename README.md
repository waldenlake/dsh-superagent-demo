# dsh-superagent-demo

A demo repository for the DeepSeek Harness superagent deployment.

## React Login / Registration Demo

A polished, front-end-only demo of a login/registration flow built with
React + Vite + Tailwind CSS. No back-end is required — accounts and
sessions are persisted in the browser via `localStorage`, and a demo
account (`demo@nebula.dev` / `demo1234`) is seeded on first run.

Features:

- **Register** — create a local account with name, email, password and a
  live password-strength indicator.
- **Login** — sign in with email + password; wrong credentials surface
  inline errors. A "fill demo account" button pre-loads the seeded login.
- **Home** — after a successful login/register the app redirects to the
  user's dashboard, showing a personalized greeting, account card and a
  few mock activity items. A "Log out" button clears the session and
  routes back to the login page.

## Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/waldenlake/dsh-superagent-demo.git
   cd dsh-superagent-demo
   ```

2. Install dependencies and start the dev server:

   ```bash
   pnpm install
   pnpm dev
   ```

   Then open [http://localhost:5173](http://localhost:5173) and use the
   demo account `demo@nebula.dev` / `demo1234`.

3. Build a production bundle:

   ```bash
   pnpm build
   pnpm preview
   ```

The `shots/` folder contains reference screenshots of the login,
register and home screens captured on the agent's PR.

## Auto Deployment

Every push to the repository triggers the `Auto Deploy` GitHub Actions
workflow (`.github/workflows/deploy.yml`), which builds the static bundle
with `pnpm build`. Pushes to `main` additionally publish the bundle to
GitHub Pages via `actions/deploy-pages`.

One-time prerequisite — before the first automatic deployment succeeds:

1. In the repository, go to **Settings → Pages**.
2. Set **Source** to **GitHub Actions** (not "Deploy from a branch").

Until that is configured, the workflow builds on every push but skips the
Pages publication step. After configuration, each push to `main` refreshes
the live site at `https://<owner>.github.io/<repo>/`.
