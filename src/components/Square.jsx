import React from 'react'
import styles from './Square.module.css'

export default function Square({ id, handleGamePositions, value, gameEnd }) {

    const handleClick = () => {
        if (!gameEnd && value === "") {
            handleGamePositions(id)
        }
    }
    return (
        <div className={`${styles.square} ${value == "" && !gameEnd ? styles.squareTransition : ""}`} onClick={handleClick}>
            {value}
        </div>
    )
}
