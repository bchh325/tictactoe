import React from 'react'
import styles from './Square.module.css'

export default function Square({ id, handleGamePositions, value}) {
    return (
        <div className={styles.square} onClick={() => handleGamePositions(id)}>
            {value}
        </div>
    )
}
