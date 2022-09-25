import { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';

function App() {
  
  const [winner, setWinner] = useState("")

  const handleWinner = (value) => {
    setWinner(value)
  }

  return (
    <div className="App">
      <div className="GameContainer">
        <div className="GameInfoContainer">
          <div className={`GameInfo ${winner == "" ? "disable" : ""}`}>
            {winner} wins!
          </div>
        </div>
        <GameBoard handleWinner={handleWinner}/>
      </div>
    </div>
  );
}

export default App;
