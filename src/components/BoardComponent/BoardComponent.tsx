import { Dispatch, SetStateAction, Fragment, useState, useEffect } from "react";
import { Board, Cell } from "../../models";
import { Unit } from "../../models/units/Unit";
import { StrategiesType } from "../../models/enums/StrategiesType";
import CellComponent from "../CellComponent/CellComponent";
import QueueComponent from "../QueueComponent/QueueComponent";
import Controls from "../Controls/Controls";
import styles from "./BoardComponent.module.css";

interface BoardProps {
    board: Board;
    setBoard: Dispatch<SetStateAction<Board | null>>;
}

export default function BoardComponent({ board, setBoard }: BoardProps) {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const [targetCell, setTargetCell] = useState<Cell | undefined>(undefined);
    const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);
    const [round, setRound] = useState<number>(1);

    function selectCell(cell: Cell): void {
        if (
            selectedCell &&
            cell.availiable &&
            selectedCell.unit?.getActionType() === StrategiesType.SINGLE
        ) {
            setTargetCell(cell);
            return;
        }

        setSelectedCell(cell);
    }

    function updateBoard(): void {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    function hightlightCells(): void {
        selectedCell?.unit?.highlightCells();
        updateBoard();
    }

    useEffect(() => {
        board.resetHighlitedCells();
        hightlightCells();
    }, [selectedCell]);

    useEffect(() => {
        if (board.queue.currentQueue.length === 0) {
            board.queue.reset();
            setRound(round + 1);
        }
    }, [board.queue.currentQueue.length, board.queue, round]);

    return (
        <>
            <h1>Round: {round}</h1>
            <QueueComponent
                queue={board.queue.currentQueue}
                setCurrentUnit={setCurrentUnit}
                setSelectedCell={setSelectedCell}
            />
            <div className={styles.board}>
                {board.cells.map((row, index) => (
                    <Fragment key={index}>
                        {row.map((cell) => (
                            <CellComponent
                                key={cell.id}
                                selectCell={selectCell}
                                isSelected={
                                    selectedCell?.x === cell.x &&
                                    selectedCell?.y === cell.y
                                }
                                cell={cell}
                                isTarget={targetCell?.id === cell.id}
                                isParalyzed={
                                    board.queue.paralyzedInNextRound.includes(
                                        cell
                                    ) || !!(cell.unit && cell.unit.isParalyzed)
                                }
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
            <Controls
                queue={board.queue}
                setSelectedCell={setSelectedCell}
                setTargetCell={setTargetCell}
                currentUnit={currentUnit}
                selectedCell={selectedCell}
                targetCell={targetCell}
                updateBoard={updateBoard}
            />
        </>
    );
}
