'use client'

import classes from "./Counter.module.css"
import { useState, useEffect } from "react"
import LongPressButton from './LongPressButton'

export default function CustomInputNumber({
    name = "",
    min = 0,
    max = 10,
    step = 1,
    disabled,
    onChange = () => { },
}) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        onChange(count)
    }, [count])

    return (
        <div className={classes["wrap"]}>
            <LongPressButton
                name="-"
                onTrigger={() => {
                    setCount(c => (c || 0) - step)
                }}
                disabled={disabled || (count || 0) <= min}
            />
            <input
                name={name}
                type="number"
                className={classes["custom-input"]}
                value={isNaN(count) ? "" : count.toString()}
                onChange={(e) => {
                    if (e.target.value === "") {
                        setCount(NaN)
                    } else {
                        const newValue = Number(e.target.value)
                        if (newValue <= max && newValue >= min) {
                            setCount(newValue)
                        }
                    }
                }}
                disabled={disabled}
            />
            <LongPressButton
                name="+"
                onTrigger={() => {
                    setCount(c => (c || 0) + step)
                }}
                disabled={disabled || count >= max}
            />
        </div>
    )
}
