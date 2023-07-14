import { Dispatch, SetStateAction } from "react";
import { Cell, Queue } from "../../models";
import { BaseUnit, MageUnit } from "../../models/base";
import { MassHealUnit } from "../../models/base/MassHealUnit";
import styles from "./Controls.module.css";

interface ControlsProps {
    selectedCell: Cell | null;
    targetCell: Cell | null;
    updateBoard: () => void;
    setSelectedCell: Dispatch<SetStateAction<Cell | null>>;
    setTargetCell: Dispatch<SetStateAction<Cell | null>>;
    currentUnit: BaseUnit | null;
    queue: Queue;
    isMassHealer: (unit: BaseUnit) => unit is MassHealUnit;
    isMageUnit: (unit: BaseUnit) => unit is MageUnit
}

export default function Controls({
    selectedCell,
    targetCell,
    currentUnit,
    isMassHealer,
    isMageUnit,
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
            selectedCell?.unit &&
            (isMassHealer(selectedCell.unit) || isMageUnit(selectedCell.unit)) &&
            selectedCell.unit.id === currentUnit?.id
        ) {
            selectedCell.unit.interactWith();
            updateBoard();
            queue.updateQueue();
            resetCells();
        }

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
