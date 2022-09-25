import React from 'react'
import styles from './Square.module.css'

export default function Square({ id, handleGamePositions, value, gameEnd }) {

    const handleClick = () => {
        if (!gameEnd) {
            handleGamePositions(id)
        }
    }
    return (
        <div className={styles.square} onClick={handleClick}>
            {value}
        </div>
    )
}
