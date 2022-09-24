import React from 'react'
import { useState } from 'react';
import styles from './GameBoard.module.css'
import Square from './Square';

export default function GameBoard() {

    const [currentTurn, setCurrentTurn] = useState("")

    const [gamePositions, setGamePositions] = useState([
        { id: 1, pos: [0, 0], value: "", },
        { id: 2, pos: [0, 1], value: "", },
        { id: 3, pos: [0, 2], value: "", },
        { id: 4, pos: [1, 0], value: "", },
        { id: 5, pos: [1, 1], value: "", },
        { id: 6, pos: [1, 2], value: "", },
        { id: 7, pos: [2, 0], value: "", },
        { id: 8, pos: [2, 1], value: "", },
        { id: 9, pos: [2, 2], value: "", }
    ])

    const handleTurn = () => {
        const turn = currentTurn === "X" ? "O" : "X";
        setCurrentTurn(turn)
    }

    const handleGamePositions = (pos) => {
        setGamePositions(prev => {
            return prev.map(position => {
                if (position.id === pos.id) {
                    if (position.value === "") {
                        console.log("EMPTY")
                        return { ...position, value: pos.value }
                    }
                } else {
                    return position
                }
            })
        })
    }

    console.log(gamePositions)
    return (
        <div className={styles.board}>
            {gamePositions.map((pos) => (<Square key={pos.id} pos={pos} handleGamePositions={handleGamePositions} handleTurn={handleTurn} currentTurn={currentTurn} />))}
        </div>
    )
}
