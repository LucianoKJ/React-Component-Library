## 1. Theme context

- [x] 1.1 Create `component/Theme/ThemeProvider.js` (`'use client'`) with a React context holding `{ theme, setTheme, toggleTheme }`
- [x] 1.2 Resolve initial theme in a lazy `useState` initializer: `localStorage.theme` → `prefers-color-scheme` → `'light'`, guarded for `typeof window` and wrapped in try/catch
- [x] 1.3 Apply the active theme as `data-theme="light"|"dark"` on the provider's wrapper element
- [x] 1.4 Persist theme changes to `localStorage` in a `useEffect`, ignoring write failures
- [x] 1.5 Export a `useTheme()` hook that throws a clear error when used outside `ThemeProvider`

## 2. Theme styles

- [x] 2.1 In `app/globals.css`, define light/dark CSS variable sets under `[data-theme="light"]` and `[data-theme="dark"]` (background, foreground, input bg, border, button bg/text)
- [x] 2.2 Keep the existing `prefers-color-scheme` block as the no-JS fallback, ensuring `data-theme` overrides it

## 3. Theme-aware Counter

- [x] 3.1 Update `component/Counter/Counter.module.css` so wrap, `custom-input`, and buttons read color from the theme variables
- [x] 3.2 Verify the Counter and `LongPressButton` render with readable contrast in both themes

## 4. Toggle control

- [x] 4.1 Create `component/Theme/ThemeToggle.js` rendering a `<button role="switch" aria-checked>` that calls `toggleTheme` from `useTheme()`
- [x] 4.2 Show the current theme in the control's label/icon and ensure Enter/Space activate it

## 5. Wire up the counter page

- [x] 5.1 In `app/counter/page.js`, wrap the content in `ThemeProvider` and render `ThemeToggle` above the `Counter`
- [x] 5.2 Confirm the page applies `data-theme` so both the toggle and Counter respond

## 6. Verify

- [x] 6.1 Manually verify: toggle switches themes, choice persists across reload, first visit honors OS `prefers-color-scheme`
- [x] 6.2 Verify keyboard operation (Tab to focus, Enter/Space toggles) and that `localStorage` being unavailable degrades gracefully
