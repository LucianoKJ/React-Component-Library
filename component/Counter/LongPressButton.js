'use client'

import { useRef, useEffect } from "react"
import classes from './LongPressButton.module.css'

export default function LongPressButton({
    name = "",
    onTrigger = () => { },
    disabled = true,
    timeGap = 100
}) {
    const timer = useRef()

    useEffect(() => {
        const func = () => clearInterval(timer.current)
        document.addEventListener('mouseup', func)
        return () => {
            document.removeEventListener('mouseup', func)
        }
    }, [])

    useEffect(() => {
        if (disabled) clearInterval(timer.current)
    }, [disabled])

    return (
        <button
            className={classes["long-press-btn"]}
            onMouseDown={() => {
                onTrigger()
                timer.current = setInterval(() => {
                    onTrigger()
                }, timeGap)
            }}
            disabled={disabled}
        >
            {name}
        </button>
    )
}