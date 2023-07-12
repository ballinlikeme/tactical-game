import { Dispatch, SetStateAction, Fragment, useState, useEffect } from "react";
import { Board, Cell } from "../../models";
import { BaseUnit } from "../../models/base";
import CellComponent from "../CellComponent/CellComponent";
import QueueComponent from "../QueueComponent/QueueComponent";
import Controls from "../Controls/Controls";
import styles from "./BoardComponent.module.css";
import { MassHealUnit } from "../../models/base/MassHealUnit";

interface BoardProps {
    board: Board;
    setBoard: Dispatch<SetStateAction<Board | null>>;
}

export default function BoardComponent({ board, setBoard }: BoardProps) {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const [targetCell, setTargetCell] = useState<Cell | null>(null);
    const [currentUnit, setCurrentUnit] = useState<BaseUnit | null>(null);
    const [round, setRound] = useState<number>(1);

    function selectCell(cell: Cell): void {
        if (selectedCell && cell.availiable && cell.unit) {
            setTargetCell(cell);
            return;
        }

        if (selectedCell?.id === cell.id) {
            setSelectedCell(null);
            setTargetCell(null);
            return;
        }

        setSelectedCell(cell);
    }

    function isMassHealer(unit: BaseUnit): unit is MassHealUnit {
        if (unit instanceof MassHealUnit) {
            return true;
        }
        return false;
    }

    function updateBoard(): void {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    function hightlightCells(): void {
        board.hightlightCells(selectedCell);
        updateBoard();
    }

    useEffect(() => {
        setTargetCell(null);
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
                                    ) || cell.unit!.isParalyzed
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
                isMassHealer={isMassHealer}
                currentUnit={currentUnit}
                selectedCell={selectedCell}
                targetCell={targetCell}
                updateBoard={updateBoard}
            />
        </>
    );
}
