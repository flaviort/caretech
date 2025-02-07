'use client'

// libraries
import { useState, useEffect } from 'react'
import clsx from 'clsx'

// css
import styles from './index.module.scss'

export default function Guidelines() {

    const [isGridVisible, setIsGridVisible] = useState(false)

    const showHideGrid = () => {
        setIsGridVisible((prev) => !prev)
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.shiftKey && event.key.toLowerCase() === 'g') {
                event.preventDefault()
                showHideGrid()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <>

            <div className={styles.breakpoint}></div>

            <div className={clsx(styles.grid, isGridVisible && styles.visible)}>
                <div className='container'>
                    <div className='row'>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div className='col-3 col-sm-2 col-md-1' key={i}>
                                <div className={styles.block}></div>
                            </div> 
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}