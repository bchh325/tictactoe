import { useEffect, useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import StartScreen from './components/StartScreen';
import useWindowDimensions from './hooks/useWindowDimensions';

function App() {
  const {innerWidth: width, innerHeight: height} = useWindowDimensions()
  document.documentElement.style.setProperty('--doc-height', `${height}px`)
  document.documentElement.style.setProperty('--doc-width', `${width}px`)

  const [winner, setWinner] = useState("")
  const [start, setStart] = useState(false)
  const [player, setPlayer] = useState([""])
  const [currentTurn, setCurrentTurn] = useState([""])


  const reset = () => {
    setPlayer([""])
    setCurrentTurn([""])
    setWinner("")
    setStart(false)
  }
  const handleCurrentTurn = () => {
    setCurrentTurn([currentTurn[0] === "X" ? "O" : "X"])
    console.log(currentTurn)
  }

  const handleWinner = (value) => {
    setWinner(value)
  }

  const handlePlayer = (value) => {
    setStart(true)
    setCurrentTurn([value])
  }

  console.log(player)

  return (
    <div className="App">
      <div className={`${start === true ? "disable" : "StartScreen"}`}>
        <StartScreen handlePlayer={handlePlayer}/>
      </div>
      <div className="GameContainer">
        <div className="GameInfoContainer">
          <div className={`GameInfo ${winner == "" ? "disable" : ""}`}>
            {winner} wins!
          </div>
        </div>
        <GameBoard handleWinner={handleWinner} handleCurrentTurn={handleCurrentTurn} currentTurn={currentTurn} reset={reset}/>
      </div>
    </div>
  );
}

export default App;
