# theme-toggle Specification

## Purpose

Provide light/dark theme switching for the application, including a user-operable toggle
control, theme-aware Counter styling, persistence of the user's choice, sensible OS-based
defaults, and a reusable React context for accessing the active theme.

## Requirements

### Requirement: Theme toggle control

The system SHALL provide a visible control on the counter page that switches the UI
between a light theme and a dark theme. The control MUST indicate the currently active
theme and MUST be operable by both mouse and keyboard.

#### Scenario: Switching from light to dark

- **WHEN** the active theme is light and the user activates the theme toggle
- **THEN** the active theme becomes dark and the Counter and page update to dark colors

#### Scenario: Switching from dark to light

- **WHEN** the active theme is dark and the user activates the theme toggle
- **THEN** the active theme becomes light and the Counter and page update to light colors

#### Scenario: Keyboard operation

- **WHEN** the toggle control is focused and the user presses Enter or Space
- **THEN** the theme switches just as it would on a mouse click

### Requirement: Theme-aware Counter appearance

The Counter component SHALL derive its background, text, input, and increment/decrement
button colors from theme-controlled CSS custom properties, so that its appearance changes
when the active theme changes without re-mounting the component.

#### Scenario: Counter reflects dark theme

- **WHEN** the active theme is dark
- **THEN** the Counter's background, input field, and +/- buttons use the dark palette
  with readable contrast

#### Scenario: Counter reflects light theme

- **WHEN** the active theme is light
- **THEN** the Counter's background, input field, and +/- buttons use the light palette
  with readable contrast

### Requirement: Theme persistence

The system SHALL persist the user's selected theme in `localStorage` and SHALL restore it
on subsequent visits, so the choice survives page reloads.

#### Scenario: Choice restored after reload

- **WHEN** the user has selected dark mode and then reloads the page
- **THEN** the page loads in dark mode without the user toggling again

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
