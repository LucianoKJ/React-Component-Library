'use client'

import classes from "./ThemeToggle.module.css"
import { useTheme } from "./ThemeProvider"

const THEME_LABELS = {
    light: { icon: "☀️", text: "Light mode" },
    gray: { icon: "🌗", text: "Gray mode" },
    dark: { icon: "🌙", text: "Dark mode" },
}

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    const { icon, text } = THEME_LABELS[theme] ?? THEME_LABELS.light

    // Three states, so a binary `switch`/aria-checked no longer fits. A plain
    // button whose accessible name reports the active theme is honest for a cycle.
    return (
        <button
            type="button"
            aria-label={`Theme: ${text}. Activate to change.`}
            className={classes["theme-toggle"]}
            onClick={toggleTheme}
        >
            <span aria-hidden="true">{icon}</span>
            {text}
        </button>
    )
}
