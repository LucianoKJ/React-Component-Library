"use client"

import { useState } from 'react'
import classes from './Slider.module.css'

export default function Slider({ defaultRange = 5, itemWidth = 100, data = [] }) {
    if (data.length === 0) return null

    const [focus, setFocus] = useState(0)
    const [items, setItems] = useState(() => {
        const multiple = Math.ceil(defaultRange / data.length)
        return new Array(multiple)
            .fill(data.map((value, index) => ({ value, index })))
            .flat()
            .slice(0, defaultRange)
            .map((value, key) => ({ ...value, key }))
    })

    const getNewImdex = (newIndex) => newIndex - Math.floor(newIndex / data.length) * data.length

    return (
        <div
            className={classes.container}
            style={{
                width: `${defaultRange * itemWidth}px`,
            }}>
            <div className={classes.wrap}>
                <div
                    onTransitionEnd={(e) => {
                        if (e.propertyName === "left") {
                            const { key: leftMostKey } = items[0]
                            const startPoint = focus - leftMostKey
                            setItems(items.slice(startPoint, startPoint + defaultRange))
                        }
                    }}
                    className={classes.box}
                    style={{
                        width: `${(items.length) * itemWidth}px`,
                        transform: `translateX(${items[0].key * itemWidth}px)`,
                        transition: "left 1s",
                        left: `${-focus * itemWidth}px`
                    }}
                >
                    {items.map(({ value, key }) => (
                        <div
                            key={key}
                            style={{
                                width: `${itemWidth}px`,
                            }}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            </div>
            <div className={classes["btn-wrap"]}>
                <button
                    className={classes.btn}
                    onClick={() => {
                        const { index, key } = items[items.length - 1]
                        if (focus + defaultRange - 1 === key) {
                            const newIndex = getNewImdex(index + 1)
                            setItems([...items, { index: newIndex, value: data[newIndex], key: key + 1 }])
                        }
                        setFocus(focus + 1)
                    }}
                >
                    left
                </button>
                <button
                    className={classes.btn}
                    onClick={() => {
                        const { index, key: leftMostKey } = items[0]
                        if (focus === leftMostKey) {
                            const newIndex = getNewImdex(index - 1)
                            setItems([{ index: newIndex, value: data[newIndex], key: leftMostKey - 1 }, ...items])
                        }
                        setFocus(focus - 1)
                    }}
                >
                    right
                </button>
            </div>
        </div>
    )
}