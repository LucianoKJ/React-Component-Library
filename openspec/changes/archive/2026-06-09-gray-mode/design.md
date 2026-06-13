## Context

The theme system today is a clean, single-axis design: `ThemeProvider` holds `theme ∈
{light, dark}`, renders a `<div data-theme={theme}>` wrapper, and all visuals read CSS
custom properties keyed off `[data-theme="…"]` blocks in `globals.css`. `toggleTheme` is a
binary flip and the `ThemeToggle` is a `role="switch"` button. Adding `gray` extends the
existing axis rather than introducing a new one, so the architecture is preserved — the
work is concentrated in three small touch-points.

## Goals / Non-Goals

**Goals:**
- Add `gray` as a third palette, reachable by cycling `light → gray → dark → light`.
- Keep `data-theme` a single value (no second styling axis).
- Preserve all existing light/dark behavior, persistence, and OS-default logic.
- Keep the toggle accessible and honest about representing three states.

**Non-Goals:**
- A grayscale/desaturation *filter* layered over other themes (explicitly rejected — gray is
  a palette, not an effect).
- Direct selection of a specific theme (e.g., a segmented picker). The control stays a
  single cycling button.
- OS-driven defaulting to gray (`prefers-color-scheme` has no gray signal).

## Decisions

### Decision: Gray is a third value on the existing `data-theme` axis

Cycle order `light → gray → dark → light` orders the palettes by descending lightness, so
each activation reads as "one notch darker," which is predictable. Implemented as an ordered
array with index rotation in `toggleTheme`, replacing the boolean flip.

*Alternative considered:* a separate orthogonal "grayscale" toggle (second axis). Rejected —
it doubles the state space (light/dark × on/off), complicates persistence, and isn't what's
wanted; the user asked for a third palette in one cycle.

### Decision: "Gray" means a muted/dim palette, not a literal 50% gray

A literal mid-gray surface (`#808080`) makes readable text contrast a tightrope in both
directions. Instead, gray is a comfortable low-glare palette — a soft off-white surface with
near-black text (e.g. background `#d8d8d8`, foreground `#2a2a2a`), with input/border/button
variables chosen to clear WCAG AA against it. Exact hex values are finalized during
implementation against contrast checks; the spec only requires "distinct and readable."

*Alternative considered:* literal mid-gray. Rejected for the contrast risk.

### Decision: The toggle stops being a binary `switch`

`role="switch"` + `aria-checked` is inherently two-state and becomes dishonest with three
themes. The control becomes a plain `<button>` whose visible label and `aria-label` name the
active theme (e.g. "Theme: gray"). Activation advances the cycle; the accessible name updates
each step so screen-reader users always know the current state.

*Alternative considered:* a `role="radiogroup"` segmented control with three radios. More
accessible for direct selection but a larger UI change that abandons the single-button
"toggle" metaphor and the component's name. Deferred (see Non-Goals).

### Decision: `getStoredTheme` validates against the three-value set

Validation widens from `light|dark` to `light|gray|dark`; any other stored value falls
through to the OS preference default. This keeps restoration robust and round-trips gray.

## Risks / Trade-offs

- **Cycling button can't jump directly to a theme** → Acceptable for three stops; a user is
  at most two clicks from any theme. Revisit with a segmented control if the palette count
  grows.
- **Gray contrast may be marginal for some elements** → Mitigate by checking each themed
  variable (text, border, input, buttons) against WCAG AA during implementation, not just the
  background/foreground pair.
- **No-JS / `prefers-color-scheme` fallback never yields gray** → Intended; gray is an
  explicit, JS-driven choice only. The existing media-query fallback in `globals.css` is left
  untouched.

## Open Questions

- Final gray hex values — to be locked against a contrast checker during implementation.
- Icon for the gray state in the toggle label (e.g. 🌗) — cosmetic, decided in implementation.
