import { useEffect, useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import StartScreen from './components/StartScreen';
import useWindowDimensions from './hooks/useWindowDimensions';
import db from './firebase';
import { doc } from 'firebase/firestore';
import { useFetchData } from './hooks/useFetchData';

function App() {
  const lossDocRef = doc(db, "loss_data", "losses")
  const winDocRef = doc(db, "ties_data", "ties")
  const tieDocRef = doc(db, "wins_data", "wins")

  const {innerWidth: width, innerHeight: height} = useWindowDimensions()
  document.documentElement.style.setProperty('--doc-height', `${height}px`)
  document.documentElement.style.setProperty('--doc-width', `${width}px`)

  const [winner, setWinner] = useState("")
  const [start, setStart] = useState(false)
  const [player, setPlayer] = useState([""])
  const [currentTurn, setCurrentTurn] = useState([""])

  const dataSnapshot = useFetchData(lossDocRef)

  if (dataSnapshot != null) {
    console.log(dataSnapshot.data())
  }

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
