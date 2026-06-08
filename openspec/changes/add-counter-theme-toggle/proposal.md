## Why

The Counter component currently inherits whatever colors the page provides and has no
explicit theming. Users on the counter demo page cannot switch between a light and dark
appearance, and the component looks inconsistent against different backgrounds. Adding a
dark/light mode switch makes the counter readable in both schemes and gives the library
a reusable pattern for themeable components.

## What Changes

- Add a **theme toggle control** (a switch/button) on the counter page that flips between
  light and dark mode.
- Make the **Counter component theme-aware**: its background, text, input, and +/- buttons
  read from CSS custom properties that change with the active theme.
- **Persist the user's choice** in `localStorage` and respect the OS
  `prefers-color-scheme` setting on first visit.
- Expose theme state through a small, reusable mechanism (a `ThemeProvider` / `useTheme`
  hook) so other components can adopt it later.

## Capabilities

### New Capabilities
- `theme-toggle`: User-facing ability to switch the UI between light and dark mode, with
  persistence and OS-preference detection, applied to the Counter component and its page.

### Modified Capabilities
<!-- No existing specs in openspec/specs/; nothing to modify. -->

## Impact

- **Code**: `component/Counter/Counter.js`, `component/Counter/Counter.module.css`,
  `app/counter/page.js`, and `app/globals.css`. New files for the theme provider/hook and
  a toggle control component.
- **APIs**: New `ThemeProvider` component and `useTheme()` hook (light/dark state + setter).
- **Dependencies**: None — implemented with React state, CSS variables, and `localStorage`.
- **Systems**: Client-side only; no server or build changes.
