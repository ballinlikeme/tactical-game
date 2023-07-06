import { Dispatch, SetStateAction, Fragment, useState, useEffect } from "react"
import { Board, Cell } from "../models";
import CellComponent from "./CellComponent";
import { DamageUnit } from "../models/base/DamageUnit";

interface BoardProps {
    board: Board;
    setBoard: Dispatch<SetStateAction<Board | null>>
}

export default function BoardComponent({ board, setBoard }: BoardProps) {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function selectCell(cell: Cell): void {
        if (selectedCell?.x === cell.x && selectedCell?.y === cell.y) {
            setSelectedCell(null);
            return;
        }

        if
            (
            selectedCell
            && selectedCell?.unit?.playerId !== cell.unit?.playerId
            && (selectedCell!.unit instanceof DamageUnit)
            && cell?.availiable
        ) {
            // Логика атаки
            selectedCell.unit!.interactWith(cell);
            updateBoard();
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

    return (
        <div className="board">
            {board.cells.map((row, index) =>
                <Fragment key={index}>
                    {row.map((cell) =>
                        <CellComponent
                            key={cell.id}
                            selectCell={selectCell}
                            isSelected={selectedCell?.x === cell.x && selectedCell?.y === cell.y}
                            cell={cell}
                        />
                    )}
                </Fragment>
            )}
        </div>
    )
}