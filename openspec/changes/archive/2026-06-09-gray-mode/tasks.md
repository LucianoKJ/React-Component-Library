## 1. Gray palette in CSS

- [x] 1.1 Add a `[data-theme="gray"]` block in `app/globals.css` defining `--background`,
  `--foreground`, `--input-bg`, `--border`, `--button-bg`, `--button-fg` for a muted gray palette
- [x] 1.2 Verify each gray variable clears WCAG AA contrast against its surface (text, border,
  input, buttons), adjusting hex values as needed

## 2. ThemeProvider cycle logic

- [x] 2.1 Define the ordered theme list `["light", "gray", "dark"]` and rewrite `toggleTheme`
  to advance the index and wrap (replacing the binary flip)
- [x] 2.2 Widen `getStoredTheme` validation to accept `"light" | "gray" | "dark"`, falling
  through to the OS default for any other stored value
- [x] 2.3 Confirm persistence round-trips `gray` to/from `localStorage` on reload

## 3. ThemeToggle three-state control

- [x] 3.1 Remove the binary `role="switch"`/`aria-checked` semantics; make it a plain button
  whose visible label and `aria-label` name the active theme
- [x] 3.2 Map each theme to its label/icon (light ☀️, gray 🌗, dark 🌙) and render the active one
- [x] 3.3 Verify Enter/Space and click both advance the cycle and the accessible name updates each step

## 4. Verification

- [x] 4.1 Cycle light → gray → dark → light on the counter page and confirm the Counter and
  page surface update in place (no re-mount) for all three themes
- [x] 4.2 Reload in gray mode and confirm it restores; confirm light/dark still behave as before
