import { useEffect, useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import StartScreen from './components/StartScreen';

function App() {

  const [winner, setWinner] = useState("")
  const [start, setStart] = useState(false)
  const [player, setPlayer] = useState([""])
  const [currentTurn, setCurrentTurn] = useState([""])

  const handleCurrentTurn = () => {
    setCurrentTurn([currentTurn[0] === "X" ? "O" : "X"])
    console.log(currentTurn)
  }

  const handleWinner = (value) => {
    setWinner(value)
  }

  const handlePlayer = (value) => {
    setCurrentTurn([value])
    setStart(true)
  }

  console.log(player)

  return (
    <div className="App">
      <div className={`${start == true ? "disable" : "StartScreen"}`}>
        <StartScreen handlePlayer={handlePlayer}/>
      </div>
      <div className="GameContainer">
        <div className="GameInfoContainer">
          <div className={`GameInfo ${winner == "" ? "disable" : ""}`}>
            {winner} wins!
          </div>
        </div>
        <GameBoard handleWinner={handleWinner} handleCurrentTurn={handleCurrentTurn} currentTurn={currentTurn}/>
      </div>
    </div>
  );
}

export default App;
