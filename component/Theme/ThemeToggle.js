'use client'

import classes from "./ThemeToggle.module.css"
import { useTheme } from "./ThemeProvider"

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === "dark"

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label="Toggle dark mode"
            className={classes["theme-toggle"]}
            onClick={toggleTheme}
        >
            <span aria-hidden="true">{isDark ? "🌙" : "☀️"}</span>
            {isDark ? "Dark mode" : "Light mode"}
        </button>
    )
}
