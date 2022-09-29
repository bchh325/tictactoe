import React from 'react'
import styles from './StartScreen.module.css'

export default function StartScreen({ handlePlayer }) {

    const handleClick = (value) => {
        handlePlayer(value)
    } 
    return (
        <div className={styles.StartContainer}>
            <div className={styles.StartInfo}>
                <h1 className={styles.header}>Select First Player</h1>
                <button className={styles.Button} onClick={() => handleClick("X")}>Human</button>
                <button className={styles.Button} onClick={() => handleClick("O")}>AI</button>
            </div>
        </div>
    )
}
