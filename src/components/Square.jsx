import React from 'react'
import styles from './Square.module.css'

export default function Square({ pos, handleGamePositions, handleTurn, currentTurn }) {

    const handleBoardValue = () => {
        
    }

    return (
        <div className={styles.square} onClick={handleBoardValue}>
            {pos.value}
        </div>
    )
}
