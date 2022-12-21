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

  const [winner, setWinner] = useState("")
  const [boardFull, setBoardFull] = useState(false)
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
  
  const getDatabase = () => {
    return new Promise(function (myResolve, myReject) {
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

      db = getFirestore(app)

      myResolve("database fetched"); // when successful
      myReject("error fetching database");  // when error
    });
  }

  useEffect(() => {
    const connectDatabase = getDatabase()

    connectDatabase.then((e) => {
      console.log(e)
      console.log("setting ref")
      lossDocRef = doc(db, "loss_data", "losses")
      winDocRef = doc(db, "win_data", "wins")
      tieDocRef = doc(db, "ties_data", "ties")
    }).then(() => getRecords()
    ).then((data) => {
      setGameData(data)
    })
  }, [])

  useEffect(() => {
    const connectDatabase = getDatabase()

    connectDatabase.then(() => {
      lossDocRef = doc(db, "loss_data", "losses")
      winDocRef = doc(db, "win_data", "wins")
      tieDocRef = doc(db, "ties_data", "ties")
    })
    .then(() => getRecords())
    .then((data) => {
      if (winner === "O") {
        const updatedData = {count: data.losses += 1} 
        updateDoc(lossDocRef, updatedData)
      } else if (winner === "X") {
        const updatedData = {count: data.wins += 1} 
        updateDoc(winDocRef, updatedData)
      } else if (winner === "" && boardFull) {
        const updatedData = {count: data.ties += 1} 
        updateDoc(tieDocRef, updatedData)
        console.log("updated")
      }

      console.log("modification")
      console.log(data)
    }).then(() => {
      setRecords()
    })
  }, [winner, boardFull])

  const getRecords = async () => {
    const data = { losses: null, wins: null, ties: null }
    console.log("grabbing records")
    try {
      const lossDocSnap = await getDoc(lossDocRef);
      const winDocSnap = await getDoc(winDocRef);
      const tieDocSnap = await getDoc(tieDocRef);

      data.losses = lossDocSnap.data().count
      data.wins = winDocSnap.data().count
      data.ties = tieDocSnap.data().count
    } catch (error) {
      console.log(error)
    }

    console.log("return")
    console.log(data)
    return data
  }

  const setRecords = async () => {
    const connectDatabase = getDatabase()

    connectDatabase.then((e) => {
      console.log(e)
      console.log("setting ref")
      lossDocRef = doc(db, "loss_data", "losses")
      winDocRef = doc(db, "win_data", "wins")
      tieDocRef = doc(db, "ties_data", "ties")
    }).then(() => getRecords()
    ).then((data) => {
      setGameData(data)
    })
  }

  const modifyRecords = async () => {

  }


  const { innerWidth: width, innerHeight: height } = useWindowDimensions()
  document.documentElement.style.setProperty('--doc-height', `${height}px`)
  document.documentElement.style.setProperty('--doc-width', `${width}px`)

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

  const handleBoardFull = (value) => {
    setBoardFull(value)
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
        <GameBoard handleWinner={handleWinner} handleCurrentTurn={handleCurrentTurn} currentTurn={currentTurn} reset={reset} gameData={gameData} handleBoardFull={handleBoardFull} />
      </div>
    </div>
  );
}

export default App;
