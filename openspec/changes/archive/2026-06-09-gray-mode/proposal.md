## Why

The theme system currently offers only a binary light/dark choice. Some users want a
softer middle ground — a low-glare alternative that is neither a bright white surface nor
a fully dark one. Adding a third "gray" palette gives that comfortable in-between option
without introducing a separate setting; it slots naturally into the existing toggle.

## What Changes

- Add a third theme value, `gray`, alongside `light` and `dark`.
- The toggle becomes a **3-way cycle** instead of a binary flip: `light → gray → dark → light`,
  stepping one notch darker per activation and wrapping at the end.
- Add a `gray` palette to the CSS custom properties so the Counter, Slider, and page surface
  render correctly in gray mode without re-mounting.
- Theme persistence and restoration accept and round-trip the `gray` value.
- Update the toggle control's label and accessible semantics to honestly represent three
  states (the binary `role="switch"` model no longer fits).

Note: `prefers-color-scheme` only signals light or dark, so first-visit OS defaulting is
unaffected — `gray` is only ever reached by explicit user choice. No breaking changes.

## Capabilities

### New Capabilities
<!-- None — this extends the existing theme-toggle capability. -->

### Modified Capabilities
- `theme-toggle`: the active theme is no longer binary (adds `gray`); the toggle control
  cycles through three states rather than flipping between two; persistence and restoration
  accept the `gray` value; the toggle's accessible semantics change to represent three states.

## Impact

- `component/Theme/ThemeProvider.js` — theme enum, `toggleTheme` cycle logic, `getStoredTheme` validation.
- `component/Theme/ThemeToggle.js` — three-state label/icon and accessible semantics.
- `component/Theme/ThemeToggle.module.css` — minor, if the control representation changes.
- `app/globals.css` — new `[data-theme="gray"]` palette block.
- No API, dependency, or data-shape changes; existing light/dark behavior is preserved.
