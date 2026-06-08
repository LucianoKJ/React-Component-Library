'use client'

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext(null)

const STORAGE_KEY = "theme"

function getStoredTheme() {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored === "light" || stored === "dark") return stored
    } catch {
        // localStorage unavailable (private mode / disabled) - fall through
    }
    try {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark"
    } catch {
        // matchMedia unavailable - fall through
    }
    return "light"
}

export function ThemeProvider({ children }) {
    // Start with a deterministic value so the server render and the first client
    // render agree (avoids the hydration mismatch). The real theme is resolved
    // after mount, where localStorage/matchMedia are available.
    const [theme, setTheme] = useState("light")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setTheme(getStoredTheme())
        setMounted(true)
    }, [])

    useEffect(() => {
        // Don't persist until the stored theme has been read on mount, otherwise
        // the initial "light" would clobber a previously stored choice.
        if (!mounted) return
        try {
            window.localStorage.setItem(STORAGE_KEY, theme)
        } catch {
            // ignore write failures; keep in-memory state for the session
        }
    }, [theme, mounted])

    const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"))

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            <div data-theme={theme}>{children}</div>
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (ctx === null) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return ctx
}
