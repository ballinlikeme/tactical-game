import { useState, useEffect } from "react";
import { Board, Queue } from "./models";
import BoardComponent from "./components/BoardComponent/BoardComponent";
import Container from "./components/Container/Container";
import "./App.css";

function App() {
    const [board, setBoard] = useState<Board | null>(null);

    useEffect(() => {
        restart();
    }, []);

    function restart(): void {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.setUpUnits();
        newBoard.queue.reset();
        setBoard(newBoard);
    }

    return (
        <Container>
            {board && <BoardComponent setBoard={setBoard} board={board} />}
        </Container>
    );
}

export default App;
