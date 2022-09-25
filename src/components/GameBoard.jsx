import React from 'react'
import { useState, useEffect } from 'react';
import styles from './GameBoard.module.css'
import Square from './Square';

export default function GameBoard({ handleWinner }) {

    const [currentTurn, setCurrentTurn] = useState("")
    const [gameEnd, setGameEnd] = useState(false)
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

    useEffect(() => {
        const turn = currentTurn === "X" ? "O" : "X"
        setCurrentTurn(turn)
        console.log(currentTurn)
    }, gamePositions)

    useEffect(() => {
        const diagonals = [[1, 5, 9], [3, 5, 7]]
        let gameEndState = false

        for (let row = 0; row <= 2; row++) {
            let x = 0
            let o = 0
            for (let col = 0; col <= 2; col++) {
                gamePositions.every(p => {
                    if (p.pos[0] == row && p.pos[1] == col) {
                        if (p.value === "X") {
                            x++
                        } else if (p.value === "O") {
                            o++
                        }
                        return false
                    }
                    return true
                })
            }
            if (x == 3 || o == 3) {
                x === 3 ? handleWinner("X") : handleWinner("O") 
                gameEndState = true
            }
        }

        if (!gameEndState) {
            for (let row = 0; row <= 2; row++) {
                let x = 0
                let o = 0
                for (let col = 0; col <= 2; col++) {
                    gamePositions.every(p => {
                        if (p.pos[1] == row && p.pos[0] == col) {
                            if (p.value === "X") {
                                x++
                            } else if (p.value === "O") {
                                o++
                            }
                            return false
                        }
                        return true
                    })
                }
                if (x == 3 || o == 3) {
                    x === 3 ? handleWinner("X") : handleWinner("O") 
                    gameEndState = true
                }
            }
        }

        if (!gameEndState) {
            diagonals.forEach(id => {
                let x = 0
                let o = 0
                for (let i = 0; i <= 2; i++) {
                    gamePositions.every(p => {
                        if (id[i] == p.id) {
                            if (p.value === "X") {
                                x++
                            } else if (p.value === "O") {
                                o++
                            }
                            return false
                        } 
                        return true
                    })
                }
                if (x == 3 || o == 3) {
                    x === 3 ? handleWinner("X") : handleWinner("O") 
                    gameEndState = true
                }
            })
        }

        if (gameEndState) {
            setGameEnd(gameEndState)
        }
    }, gamePositions)

    console.log(gameEnd)

    const handleGamePositions = (id) => {
        setGamePositions(prev => {
            return prev.map(position => {
                if (position.id === id) {
                    const modification = position.value === "" ? { ...position, value: currentTurn } : position
                    return modification
                } else {
                    return position
                }
            })
        })
    }

    return (
        <div className={styles.board}>
            {gamePositions.map((pos) => (<Square key={pos.id} id={pos.id} value={pos.value} handleGamePositions={handleGamePositions} gameEnd={gameEnd} />))}
        </div>
    )
}
