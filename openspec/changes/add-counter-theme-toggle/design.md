## Context

This is a Next.js (App Router) component library. `app/globals.css` already defines
`--background` and `--foreground` custom properties and flips them via a
`@media (prefers-color-scheme: dark)` block, but nothing lets the user *override* the OS
preference, and the Counter component (`component/Counter/Counter.js` +
`Counter.module.css`) hard-codes no colors at all — it just inherits the page.

We want a user-controllable light/dark switch on the counter page, persisted across
reloads, that other components can later reuse. The constraint is that theme must be
known at first paint to avoid a flash of the wrong theme (FOUC), and `localStorage` is
only available on the client.

## Goals / Non-Goals

**Goals:**
- A user-operable toggle on the counter page that switches light ↔ dark.
- Counter colors driven by theme CSS variables; no re-mount on theme change.
- Persist choice in `localStorage`; fall back to `prefers-color-scheme` on first visit.
- A reusable `ThemeProvider` + `useTheme()` API for future components.

**Non-Goals:**
- A global app-wide theme switcher on every page (only the counter page is in scope now).
- More than two themes, custom palettes, or per-component theme overrides.
- Server-side persistence or syncing theme across devices.

## Decisions

**1. Theme stored as a `data-theme` attribute on a wrapper, driving CSS variables.**
The active theme is applied as `data-theme="light" | "dark"` on the provider's wrapping
element. CSS defines variable sets under `[data-theme="light"]` and `[data-theme="dark"]`.
- *Why over toggling a class:* a single attribute is easy to read/set and reads clearly in
  devtools.
- *Why over inline styles:* CSS variables let `Counter.module.css` stay declarative and
  keep all color values in CSS rather than JS.

**2. React Context (`ThemeProvider` + `useTheme`) holds `{ theme, setTheme, toggleTheme }`.**
- *Alternative considered:* lifting state into the page component and prop-drilling. Rejected
  because the spec calls for reusable access (`useTheme`) for future components.

**3. Initialization order: `localStorage` → `prefers-color-scheme` → light.**
On mount, read `localStorage.theme`; if absent, read
`window.matchMedia('(prefers-color-scheme: dark)')`; else default light. Writes to state go
back to `localStorage`.
- Because `localStorage`/`matchMedia` are client-only, the provider is a `'use client'`
  component and resolves the initial theme in a `useEffect`/lazy initializer guarded for
  `typeof window`.

**4. Scope the provider to the counter page, not the root layout.**
Wrap `app/counter/page.js` content in `ThemeProvider`. This keeps the change local and
avoids touching the shared root layout, matching the Non-Goals.

**5. Toggle control is a `<button role="switch" aria-checked>`.**
Native button gives keyboard activation (Enter/Space) and focus for free, satisfying the
keyboard scenario; `role="switch"` + `aria-checked` communicates state to assistive tech.

## Risks / Trade-offs

- **Flash of incorrect theme (FOUC) on load** → Because the page is client-rendered for
  this demo, resolve the theme in a lazy `useState` initializer so the first committed
  render already has the correct `data-theme`; accept a brief default during hydration as
  acceptable for a demo page. A blocking inline `<script>` in `<head>` is the production-
  grade fix but is out of scope (would touch the root layout).
- **`localStorage` unavailable (private mode / disabled)** → Wrap reads/writes in
  try/catch; on failure fall back to in-memory state for the session.
- **Counter currently has no colors of its own** → Introducing variables changes its look;
  mitigate by choosing palettes with sufficient contrast and verifying both themes visually.
- **Scope limited to counter page** → `useTheme()` called outside the provider must throw a
  clear error to prevent silent misuse by future components.
