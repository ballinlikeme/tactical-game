import { Dispatch, SetStateAction } from "react";
import { Cell, Queue } from "../../models";
import { BaseUnit } from "../../models/base";
import styles from "./Controls.module.css";

interface ControlsProps {
    selectedCell: Cell | null;
    targetCell: Cell | null;
    updateBoard: () => void;
    setSelectedCell: Dispatch<SetStateAction<Cell | null>>;
    setTargetCell: Dispatch<SetStateAction<Cell | null>>;
    currentUnit: BaseUnit | null;
    queue: Queue;
}

export default function Controls({
    selectedCell,
    targetCell,
    currentUnit,
    updateBoard,
    setSelectedCell,
    setTargetCell,
    queue,
}: ControlsProps) {
    function resetCells(): void {
        setSelectedCell(null);
        setTargetCell(null);
    }

    function attack(): void {
        if (
            selectedCell &&
            targetCell &&
            selectedCell.unit?.id === currentUnit?.id
        ) {
            selectedCell.unit?.interactWith(targetCell);
            updateBoard();
            queue.updateQueue();
            resetCells();
        }
    }

    function defend() {
        console.log("defend");
    }

    function skip() {
        queue.updateQueue();
        resetCells();
    }

    return (
        <div className={styles.controls}>
            <button className={styles.button} onClick={() => attack()}>
                ATTACK
            </button>
            <button className={styles.button}>DEFEND</button>
            <button className={styles.button} onClick={() => skip()}>
                SKIP
            </button>
        </div>
    );
}
