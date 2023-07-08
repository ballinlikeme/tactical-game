import { Dispatch, SetStateAction, Fragment, useState, useEffect } from "react"
import { Board, Cell, Player } from "../models";
import { BaseUnit } from "../models/base";
import CellComponent from "./CellComponent";
import Queue from "./Queue";
import Controls from "./Controls";

interface BoardProps {
    board: Board;
    setBoard: Dispatch<SetStateAction<Board | null>>;
}

export default function BoardComponent({ board, setBoard }: BoardProps) {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const [targetCell, setTargetCell] = useState<Cell | null>(null);
    const [currentUnit, setCurrentUnit] = useState<BaseUnit | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [queue, setQueue] = useState<Cell[] | null>(null);
    const [round, setRound] = useState<number>(1);

    function selectCell(cell: Cell): void {
        if (selectedCell && cell.availiable) {
            setTargetCell(cell);
            return;
        }

        if (selectedCell?.id === cell.id) {
            setSelectedCell(null);
            setTargetCell(null)
            return;
        }

        setSelectedCell(cell);
    }

    function hightlightCells(): void {
        board.hightlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard(): void {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    useEffect(() => {
        hightlightCells();
    }, [selectedCell])

    useEffect(() => {
        setQueue(board.cells
            .reduce((prev, curr) => prev.concat(curr))
            .sort((a, b) => b.unit!.initiative - a.unit!.initiative)
        )
    }, [])

    useEffect(() => {
        if (queue?.length === 0) {
            setRound(prev => prev++);
            setQueue(board.cells
                .reduce((prev, curr) => prev.concat(curr))
                .filter(cell => !cell.unit?.isDead)
                .sort((a, b) => a.unit!.initiative - b.unit!.initiative)
            )
        }
    }, [queue])

    return (
        <>
            <h1>Round: {round}</h1>
            <Queue
                queue={queue}
                setCurrentPlater={setCurrentPlayer}
                setCurrentUnit={setCurrentUnit}
                setSelectedCell={setSelectedCell}
                setTargetCell={setTargetCell}
            />
            <div className="board">
                {board.cells.map((row, index) =>
                    <Fragment key={index}>
                        {row.map((cell) =>
                            <CellComponent
                                key={cell.id}
                                selectCell={selectCell}
                                isSelected={selectedCell?.x === cell.x && selectedCell?.y === cell.y}
                                cell={cell}
                                isTarget={targetCell?.id === cell.id}
                            />
                        )}
                    </Fragment>
                )}
            </div>
            <Controls
                setSelectedCell={setSelectedCell}
                setTargetCell={setTargetCell}
                currentUnit={currentUnit}
                selectedCell={selectedCell}
                setQueue={setQueue}
                targetCell={targetCell}
                updateBoard={updateBoard}
            />
        </>
    )
}