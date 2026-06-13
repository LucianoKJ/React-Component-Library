# theme-toggle Specification

## Purpose

Provide light/gray/dark theme switching for the application, including a user-operable
toggle control, theme-aware Counter styling, persistence of the user's choice, sensible
OS-based defaults, and a reusable React context for accessing the active theme.

## Requirements

### Requirement: Gray theme palette

The system SHALL provide a third theme, `gray`, as a peer to `light` and `dark`. When the
active theme is `gray`, the page surface and all theme-aware components SHALL render from a
muted gray palette that is visually distinct from both light and dark and that maintains
readable text contrast.

#### Scenario: Gray theme renders a distinct, readable surface

- **WHEN** the active theme is `gray`
- **THEN** the page surface and theme-aware components use the gray palette
- **AND** text remains readable against the gray background

#### Scenario: Components reflect gray without re-mounting

- **WHEN** the active theme changes to or from `gray`
- **THEN** the Counter, Slider, and page update their colors in place, driven by the
  theme-controlled CSS custom properties, without re-mounting

### Requirement: Theme toggle control

The system SHALL provide a visible control on the counter page that cycles the UI through
three themes in the order `light → gray → dark → light`, stepping one notch and wrapping at
the end. The control MUST indicate the currently active theme and MUST be operable by both
mouse and keyboard. Because the control represents three states rather than two, it MUST NOT
rely on a binary on/off (`switch`) semantic; its accessible name MUST convey the active
theme.

#### Scenario: Cycling forward through the three themes

- **WHEN** the user activates the toggle
- **THEN** the active theme advances one step in the order `light → gray → dark → light`
- **AND** the Counter and page update to the new theme's colors

#### Scenario: Wrapping from dark back to light

- **WHEN** the active theme is `dark` and the user activates the toggle
- **THEN** the active theme becomes `light`

#### Scenario: Keyboard operation

- **WHEN** the toggle control is focused and the user presses Enter or Space
- **THEN** the theme advances one step exactly as it would on a mouse click

#### Scenario: Control indicates the active theme

- **WHEN** any of the three themes is active
- **THEN** the control's visible label and accessible name reflect that active theme

### Requirement: Theme-aware Counter appearance

The Counter component SHALL derive its background, text, input, and increment/decrement
button colors from theme-controlled CSS custom properties, so that its appearance changes
when the active theme changes — among `light`, `gray`, and `dark` — without re-mounting the
component.

#### Scenario: Counter reflects dark theme

- **WHEN** the active theme is dark
- **THEN** the Counter's background, input field, and +/- buttons use the dark palette
  with readable contrast

#### Scenario: Counter reflects light theme

- **WHEN** the active theme is light
- **THEN** the Counter's background, input field, and +/- buttons use the light palette
  with readable contrast

#### Scenario: Counter reflects gray theme

- **WHEN** the active theme is gray
- **THEN** the Counter's background, input field, and +/- buttons use the gray palette
  with readable contrast

### Requirement: Theme persistence

The system SHALL persist the user's selected theme — one of `light`, `gray`, or `dark` — in
`localStorage` and SHALL restore it on subsequent visits, so the choice survives page
reloads.

#### Scenario: Gray choice restored after reload

- **WHEN** the user has selected gray mode and then reloads the page
- **THEN** the page loads in gray mode without the user toggling again

#### Scenario: Dark choice restored after reload

- **WHEN** the user has selected dark mode and then reloads the page
- **THEN** the page loads in dark mode without the user toggling again

#### Scenario: Unrecognized stored value is ignored

- **WHEN** the stored theme value is not one of `light`, `gray`, or `dark`
- **THEN** the system falls back to the OS preference default

### Requirement: OS preference default

On a user's first visit, when no stored theme exists, the system SHALL default to the
theme indicated by the operating system `prefers-color-scheme` setting.

#### Scenario: First visit with dark OS preference

- **WHEN** there is no stored theme and the OS `prefers-color-scheme` is dark
- **THEN** the page loads in dark mode

#### Scenario: First visit with light OS preference

- **WHEN** there is no stored theme and the OS `prefers-color-scheme` is light
- **THEN** the page loads in light mode

### Requirement: Reusable theme access

The system SHALL expose the active theme and a setter through a shared React context
(a `ThemeProvider` and a `useTheme()` hook) so that any component within the provider can
read and change the theme.

#### Scenario: Component reads theme via hook

- **WHEN** a component rendered inside the `ThemeProvider` calls `useTheme()`
- **THEN** it receives the current theme value and a function to change it
