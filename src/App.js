import { useEffect, useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import StartScreen from './components/StartScreen';
import useWindowDimensions from './hooks/useWindowDimensions';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';
import { useFetchData } from './hooks/useFetchData';
import { initializeApp } from '@firebase/app';

function App() {
  let lossDocRef = null
  let winDocRef = null
  let tieDocRef = null

  let db = null

  const setRecords = async () => {
    console.log(db)
    console.log(lossDocRef)
      try {
        const docSnap = await getDoc(lossDocRef);
        console.log(docSnap.data())
      } catch (error) {
        console.log(error)
      }
  }

  let connectDatabase = new Promise(function (myResolve, myReject) {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_apiKey,
      authDomain: process.env.REACT_APP_authDomain,
      projectId: process.env.REACT_APP_projectId,
      storageBucket: process.env.REACT_APP_storageBucket,
      messagingSenderId: process.env.REACT_APP_messagingSenderId,
      appId: process.env.REACT_APP_appId
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    console.log(firebaseConfig)

    db = getFirestore(app)

    myResolve("database fetched"); // when successful
    myReject("error fetching database");  // when error
  });

  connectDatabase.then((e) => {
    console.log(e)
    console.log("setting ref")
    lossDocRef = doc(db, "loss_data", "losses")
    winDocRef = doc(db, "ties_data", "ties")
    tieDocRef = doc(db, "wins_data", "wins")
  }).then(() => {
    setRecords()
  })

  const { innerWidth: width, innerHeight: height } = useWindowDimensions()
  document.documentElement.style.setProperty('--doc-height', `${height}px`)
  document.documentElement.style.setProperty('--doc-width', `${width}px`)

  const [winner, setWinner] = useState("")
  const [start, setStart] = useState(false)
  const [player, setPlayer] = useState([""])
  const [currentTurn, setCurrentTurn] = useState([""])
  const [gameData, setGameData] = useState(
    {
      losses: null,
      wins: null,
      ties: null
    }
  )

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
        <StartScreen handlePlayer={handlePlayer} />
      </div>
      <div className="GameContainer">
        <div className="GameInfoContainer">
          <div className={`GameInfo ${winner == "" ? "disable" : ""}`}>
            {winner} wins!
          </div>
        </div>
        <GameBoard handleWinner={handleWinner} handleCurrentTurn={handleCurrentTurn} currentTurn={currentTurn} reset={reset} gameData={gameData} />
      </div>
    </div>
  );
}

export default App;
