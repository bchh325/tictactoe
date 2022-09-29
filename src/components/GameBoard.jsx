import React from 'react'
import { useState, useEffect } from 'react';
import styles from './GameBoard.module.css'
import Square from './Square';
import _, { first } from "lodash";
import { getSelectionRange } from '@testing-library/user-event/dist/utils';

export default function GameBoard({ handleWinner, handleCurrentTurn, currentTurn }) {

    const [movesLeft, setMovesLeft] = useState(true)
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

    let checkGameState = (board) => {
        const diagonals = [[1, 5, 9], [3, 5, 7]]
        let gameEndState = false
        let x = 0
        let o = 0

        for (let row = 0; row <= 2; row++) {
            x = 0
            o = 0
            for (let col = 0; col <= 2; col++) {
                board.every(p => {
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
                break
            }
        }

        if (!gameEndState) {
            for (let row = 0; row <= 2; row++) {
                x = 0
                o = 0
                for (let col = 0; col <= 2; col++) {
                    board.every(p => {
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
                    break
                }
            }
        }

        if (!gameEndState) {
            diagonals.every(id => {
                x = 0
                o = 0
                for (let i = 0; i <= 2; i++) {
                    board.every(p => {
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
                    return false
                }
                return true
            })
        }

        if (gameEndState) {
            setGameEnd(gameEndState)
            if (x === 3) {
                return 10
            } else {
                return -10
            }
        }
        return 0
    }

    let checkGameState2 = (board) => {
        const diagonals = [[1, 5, 9], [3, 5, 7]]
        let gameEndState = false
        let x = 0
        let o = 0

        for (let row = 0; row <= 2; row++) {
            x = 0
            o = 0
            for (let col = 0; col <= 2; col++) {
                board.every(p => {
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
                gameEndState = true
                break
            }
        }

        if (!gameEndState) {
            for (let row = 0; row <= 2; row++) {
                x = 0
                o = 0
                for (let col = 0; col <= 2; col++) {
                    board.every(p => {
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
                    gameEndState = true
                    break
                }
            }
        }

        if (!gameEndState) {
            diagonals.every(id => {
                x = 0
                o = 0
                for (let i = 0; i <= 2; i++) {
                    board.every(p => {
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
                    gameEndState = true
                    return false
                }
                return true
            })
        }

        if (gameEndState) {
            //setGameEnd(gameEndState)
            if (x === 3) {
                return 10
            } else {
                return -10
            }
        }
        return 0
    }

    let checkMovesLeft = (board) => {
        let moves = false
        gamePositions.forEach((p) => {
            if (p.value === "") {
                moves = true
            }
        })
        return moves
    }

    useEffect(() => {
        checkGameState(gamePositions)
        setMovesLeft(checkMovesLeft(gamePositions))
    }, gamePositions)

    useEffect(() => {
        if (currentTurn[0] === "O") {
            let move = handleMove()
            setGamePositions(prev => {
                return prev.map(position => {
                    if (position.id === move) {
                        const modification = position.value === "" ? { ...position, value: currentTurn[0] } : position
                        return modification
                    } else {
                        return position
                    }
                })
            })
            handleCurrentTurn()
        } 
    }, currentTurn)

    const handleGamePositions = (id) => {
        console.log(currentTurn)
        if (currentTurn[0] === "X") {
            setGamePositions(prev => {
                return prev.map(position => {
                    if (position.id === id) {
                        const modification = position.value === "" ? { ...position, value: currentTurn[0] } : position
                        return modification
                    } else {
                        return position
                    }
                })
            })
            handleCurrentTurn()
        } 
    }

    const minimax = (board, depth, max) => {
        let score = checkGameState2(board)
        
        if (score === 10) {
            return score - depth
        } else if(score === -10) {
            return score + depth
        }

        if (checkMovesLeft(board) == false) {
            return 0
        }

        if (max) {
            let maxScore = -99999
            board.forEach((p) => {
                if (p.value === "") {
                    p.value = "X"
                    maxScore = Math.max(maxScore, minimax(board, depth + 1, !max))
                    p.value = ""
                }
            })

            return maxScore
        } else {
            let minScore = 99999

            board.forEach((p) => {
                if (p.value === "") {
                    p.value = "O"
                    minScore = Math.min(minScore, minimax(board, depth + 1, !max))
                    p.value = ""
                }
            })

            return minScore
        }
    }

    function getMove(board) {
        let value = 9999
        let id = 0

        //console.log(JSON.parse(JSON.stringify(board)))
        board.forEach((element, i, arr) => {
            if (element.value === "") {
                arr[i].value = "O"
                console.log(JSON.parse(JSON.stringify(board)))
                let temp = minimax(board, 0, true)
                arr[i].value = ""

                if (temp < value) {
                    id = element.id
                    value = temp
                }
            }
        })

        return id
    }

    const handleMove = () => {
        console.log("clicked")
        let boardCopy = _.clone(gamePositions)
        let move = getMove(boardCopy)
        return move
        }

    return (
        <div className={styles.board}>
            {gamePositions.map((pos) => (<Square key={pos.id} id={pos.id} value={pos.value} handleGamePositions={handleGamePositions} gameEnd={gameEnd} />))}
        </div>
    )
}
