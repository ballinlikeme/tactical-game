import { useState, useEffect } from "react";
import { Board, Player } from "./models"
import { BaseUnit } from "./models/base";
import BoardComponent from "./components/BoardComponent";
import Container from "./components/Container";
import Queue from "./components/Queue";
import './App.css'

function App() {

  const [board, setBoard] = useState<Board | null>(null);
  const [greenPlayer] = useState(new Player(1));
  const [redPlayer] = useState(new Player(0));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [currentUnit, setCurrentUnit] = useState<BaseUnit | null>(null);

  useEffect(() => {
    restart();
  }, [])

  useEffect(() => {
    console.log(currentPlayer);
    setCurrentPlayer(currentUnit?.playerId === 0 ? greenPlayer : redPlayer);
  }, [currentUnit])

  function restart(): void {
    const newBoard = new Board();
    newBoard.initCells()
    newBoard.setUpUnits();
    console.log(newBoard.cells)
    setBoard(newBoard)
  }

  function swapPlayer(): void {
    setCurrentPlayer(currentPlayer?.id === 0 ? greenPlayer : redPlayer)
  }

  return (
    <Container>
      {board && (
        <>
          <Queue
            cells={board.cells}
            setCurrentPlater={setCurrentPlayer}
            setCurrentUnit={setCurrentUnit}
            swapPlayer={swapPlayer}
          />
          <BoardComponent
            setBoard={setBoard}
            board={board}
          />
        </>
      )}
    </Container>
  )
}

export default App