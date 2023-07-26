import { Dispatch, SetStateAction } from "react";
import { Cell, Queue } from "../../models";
import { Unit } from "../../models/units/Unit";
import styles from "./Controls.module.css";

interface ControlsProps {
    selectedCell: Cell | null;
    targetCell: Cell | undefined;
    updateBoard: () => void;
    setSelectedCell: Dispatch<SetStateAction<Cell | null>>;
    setTargetCell: Dispatch<SetStateAction<Cell | undefined>>;
    currentUnit: Unit | null;
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
        setTargetCell(undefined);
    }

    function attack(): void {
        if (
            selectedCell &&
            selectedCell.unit &&
            currentUnit &&
            selectedCell.unit.id === currentUnit.id
        ) {
            selectedCell.unit.performAction(targetCell);
            updateBoard();
            queue.updateQueue();
            resetCells();
        }
    }

    function defend() {
        if (selectedCell && selectedCell.unit) {
            selectedCell.unit.defend();
            updateBoard();
            queue.updateQueue();
            resetCells();
        }
    }

    function skip() {
        queue.updateQueue();
        resetCells();
    }

    return (
        <div className={styles.controls}>
            <button
                className={`${styles.button} ${styles.buttonRed}`}
                onClick={() => attack()}
            >
                ATTACK
            </button>
            <button
                className={`${styles.button} ${styles.buttonGreen}`}
                onClick={() => defend()}
            >
                DEFEND
            </button>
            <button
                className={`${styles.button} ${styles.buttonGray}`}
                onClick={() => skip()}
            >
                SKIP
            </button>
        </div>
    );
}
